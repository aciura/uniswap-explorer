import { ethers } from 'ethers'
import { IToken, IUniswapTransaction } from './dtos/IUniswapTransaction'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from 'nestjs-dotenv'

const abi_IUniswapV2Router02 = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')

const uniswapV2Router02Address = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

const uniswapV2Router02Interface = new ethers.utils.Interface(
  abi_IUniswapV2Router02.abi,
)

const abi_erc20 = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
]

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

  async getTransactions(
    blockNumber: number,
    limit: number,
  ): Promise<IUniswapTransaction[]> {
    const transactions = Array.from(
      { length: limit },
      (_, index) => blockNumber - index,
    ).reduce(async (acc, block) => {
      const blockWithTransactions =
        await this.provider.getBlockWithTransactions(block)

      console.log('>> block number', blockWithTransactions.number)

      const routerIncomingTransactions =
        blockWithTransactions.transactions.filter(
          transResponse => transResponse.to === uniswapV2Router02Address,
        )
      const transactionInfo = routerIncomingTransactions.map(tx =>
        this.handleTransaction(tx),
      )

      const txs = await Promise.allSettled(transactionInfo)
      return [...(await acc), ...txs]
    }, Promise.resolve([]))

    return transactions
  }

  async handleTransaction(tx: ethers.providers.TransactionResponse) {
    console.log('\n\r$$$ transaction', tx.hash)

    const txDescription = uniswapV2Router02Interface.parseTransaction({
      data: tx.data,
      value: tx.value,
    })

    const inputs =
      uniswapV2Router02Interface.functions[txDescription.signature].inputs

    const path = txDescription.args.path
    const tokens = path && path.length ? this.getTokens(path) : []

    const result: IUniswapTransaction = {
      ...tx,
      ...txDescription,
      function_name: txDescription.name,
      from: tx.from,
      to: tx.to,
      eth_value: tx.value,
      Inputs: inputs.map(input => ({
        ...input,
        value: txDescription.args[input.name].toString(),
      })),
      path: await tokens,
      status: await this.getStatus(tx),
    }

    return result
  }

  private async getStatus(tx: ethers.providers.TransactionResponse) {
    try {
      const txReceipt = await tx.wait()
      console.log('TX Status', txReceipt.status)
      return txReceipt.status ? 'failed' : 'success'
      // txReceipt.logs.forEach(log => {
      //   const parsedLog = uniswapV2Router02Interface.parseLog(log)
      //   console.log('parsedLog', parsedLog)
      // })
    } catch (error) {
      console.error('TransactionReceipt :( ', error)
    }
    return 'unknown'
  }

  async getTokens(path: string[]): Promise<IToken[]> {
    const tokensPromise = path.map(tokenAddress =>
      this.getTokenFromAddress(tokenAddress),
    )
    const tokens = await Promise.all(tokensPromise)
    return tokens
  }

  async getTokenFromAddress(tokenAddress: string): Promise<IToken> {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      abi_erc20,
      this.provider,
    )
    const name = await tokenContract.name()
    const symbol = await tokenContract.symbol()
    const decimals = await tokenContract.decimals()

    return { name, symbol, decimals, address: tokenAddress }
  }
}
