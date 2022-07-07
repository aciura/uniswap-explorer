import { BigNumber } from 'ethers'
import { IFunctionInput } from './IFunctionInput'
import { IToken } from './IToken'

export interface IUniswapTransaction {
  hash: string

  blockNumber: number
  transactionIndex?: number

  to: string
  from: string

  // data: string
  eth_value: string
  chainId: number

  function_name: string
  inputs: IFunctionInput[]
  path: IToken[]

  status: string
}
