import { BigNumber } from 'ethers'

export interface IFunctionInput {
  name: string
  value: string
  type: string
  baseType: string
}

export interface IToken {
  name: string
  symbol: string
  decimals: number
  address: string
}

export interface IUniswapTransaction {
  hash: string

  blockNumber: number
  transactionIndex: number

  to: string
  from: string

  // data: string
  eth_value: BigNumber
  chainId: number

  function_name: string
  inputs: IFunctionInput[]
  path: IToken[]

  status: string
}
