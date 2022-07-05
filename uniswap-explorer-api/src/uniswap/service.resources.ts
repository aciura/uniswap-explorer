import { ethers } from 'ethers'
import { IToken } from './dtos/IUniswapTransaction'

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

export async function getStatus(
  tx: ethers.providers.TransactionResponse,
): Promise<'success' | 'failed'> {
  try {
    const txReceipt = await tx.wait()
    return txReceipt.status == 1 ? 'success' : 'failed'

    // txReceipt.logs.forEach(log => {
    //   const parsedLog = uniswapV2Router02Interface.parseLog(log)
    //   console.log('parsedLog', parsedLog)
    // })
  } catch (error) {
    console.error('TransactionReceipt :( ', error?.reason)
    return 'failed'
  }
}
