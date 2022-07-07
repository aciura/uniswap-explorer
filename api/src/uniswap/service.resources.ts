import { Logger } from '@nestjs/common'
import { ethers } from 'ethers'
import { IUniswapTransaction } from './dtos/IUniswapTransaction'
import { IToken } from './dtos/IToken'
import { ITxReceipt } from './dtos/ITxReceipt'

const logger = new Logger('uniswap.service.resources')

export const abi_erc20 = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
]

export async function getTokens(
  path: string[],
  provider: ethers.providers.InfuraProvider,
): Promise<IToken[]> {
  const tokensPromise = path.map(tokenAddress =>
    getTokenFromAddress(tokenAddress, provider),
  )
  const tokens = await Promise.all(tokensPromise)
  return tokens
}

export async function getTokenFromAddress(
  tokenAddress: string,
  provider: ethers.providers.InfuraProvider,
): Promise<IToken> {
  const tokenContract = new ethers.Contract(tokenAddress, abi_erc20, provider)
  const name = await tokenContract.name()
  const symbol = await tokenContract.symbol()
  const decimals = await tokenContract.decimals()

  return { name, symbol, decimals, address: tokenAddress }
}

export async function getTxReceipt(
  tx: ethers.providers.TransactionResponse,
  uniswapV2Router02Interface: ethers.utils.Interface,
): Promise<ITxReceipt> {
  try {
    const txReceipt = await tx.wait()
    const receiptData = {
      blockNumber: txReceipt.blockNumber,
      transactionIndex: txReceipt.transactionIndex,
      status: txReceipt.status == 1 ? 'success' : 'failed',
    }
    // TODO: uniswapV2Router02Interface abi is missing events
    // txReceipt.logs.forEach(log => {
    //   logger.debug('getTxReceipt', log)
    //   const parsedLog = uniswapV2Router02Interface.parseLog(log)
    //   logger.debug('parsedLog', parsedLog)
    // })
    return receiptData
  } catch (error) {
    logger.warn(`TransactionStatus ${error?.reason}, tx:${tx.hash}`)

    return { status: 'failed' }
  }
}
