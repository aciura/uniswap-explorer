import { ethers } from 'ethers'
import { IToken, IUniswapTransaction } from './dtos/IUniswapTransaction'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from 'nestjs-dotenv'
import { getStatus, getTokens } from './service.resources'

const abi_IUniswapV2Router02 = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')

const uniswapV2Router02Address = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

const uniswapV2Router02Interface = new ethers.utils.Interface(
  abi_IUniswapV2Router02.abi,
)

@Injectable()
export class UniswapService implements OnModuleInit {
  private readonly logger = new Logger(UniswapService.name)
  private provider: ethers.providers.InfuraProvider

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.provider = new ethers.providers.InfuraProvider(
      this.configService.get('ETHEREUM_NETWORK'),
      this.configService.get('INFURA_PROJECT_ID'),
    )
  }

  async getTransactions(highestBlockNumber: number, limit: number) {
    const transactions = new Map<string, Promise<IUniswapTransaction>>()

    for (
      let blockNumber = highestBlockNumber;
      blockNumber > highestBlockNumber - limit;
      blockNumber--
    ) {
      try {
        const blockWithTransactions =
          await this.provider.getBlockWithTransactions(blockNumber)

        this.logger.debug(`block number ${blockWithTransactions.number}`)

        const incomingTransactions = blockWithTransactions.transactions.filter(
          txResponse => txResponse.to === uniswapV2Router02Address,
        )

        this.logger.debug(`Transactions Count ${incomingTransactions.length}`)

        incomingTransactions.forEach(tx => {
          transactions.set(tx.hash, this.getTransactionInfo(tx))
        })
      } catch (error) {
        this.logger.error(error, blockNumber)
      }
    }

    return this.unwrapTrxPromises(transactions)
  }

  async getTransactionInfo(
    tx: ethers.providers.TransactionResponse,
  ): Promise<IUniswapTransaction> {
    this.logger.debug('$$$ transaction', tx.hash)

    const txDescription = uniswapV2Router02Interface.parseTransaction({
      data: tx.data,
      value: tx.value,
    })

    const inputs =
      uniswapV2Router02Interface.functions[txDescription.signature].inputs

    const path = txDescription.args.path
    const tokens =
      path && path.length
        ? getTokens(path, this.provider)
        : Promise.resolve([] as IToken[])

    const result: IUniswapTransaction = {
      hash: tx.hash,
      blockNumber: tx.blockNumber,
      timestamp: tx.timestamp,
      chainId: tx.chainId,
      from: tx.from,
      to: tx.to,
      eth_value: tx.value,
      function_name: txDescription.name,
      inputs: inputs.map(input => ({
        name: input.name,
        type: input.type,
        baseType: input.baseType,
        value: txDescription.args[input.name],
      })),
      path: await tokens,
      status: 'unknown',
    }
    return await getStatus(tx, result)
  }

  private unwrapTrxPromises(
    transactions: Map<string, Promise<IUniswapTransaction>>,
  ) {
    const promises = Array.from(transactions, ([_, promiseTx]) => promiseTx)

    const result = Promise.allSettled(promises).then(settled => {
      settled
        .filter(settled => settled.status !== 'fulfilled')
        .forEach(tx => {
          this.logger.error((tx as PromiseRejectedResult).reason)
        })
      return settled
        .filter(settled => settled.status === 'fulfilled')
        .map(tx => (tx as PromiseFulfilledResult<IUniswapTransaction>).value)
    })
    return result
  }
}
