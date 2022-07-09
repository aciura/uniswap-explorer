import { HStack, Link, Text, VStack } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { IToken, IUniswapTransaction } from '../../dtos/IUniswapTransaction'
import { displayFloat } from '../utils'
import { EthToken } from './EthToken'

const DECIMALS_TO_DISPLAY = 8
const UNKNOWN_AMOUNT = 'unknown'

export function TxPath({ transaction }: { transaction: IUniswapTransaction }) {
  const { inputs, path, eth_value } = transaction
  if (!path || !path.length || !inputs) return null

  const tokensMap = new Map()

  const amountIn = inputs.find(input => input.name.startsWith('amountIn'))
  const tokenIn = path[0]
  tokensMap.set(tokenIn.symbol, amountIn?.value ?? eth_value)

  const amountOut = inputs.find(input => input.name.startsWith('amountOut'))
  const tokenOut = path[path.length - 1]
  tokensMap.set(tokenOut.symbol, amountOut?.value ?? UNKNOWN_AMOUNT)

  // console.log({ tokenIn, amountIn, tokenOut, amountOut, tokensMap })

  return (
    <VStack align={'left'}>
      {path.map((token: IToken) => {
        const amount = tokensMap.get(token.symbol)
        if (!amount) {
          return (
            <Text key={token.address}>
              <EthToken token={token} />
            </Text>
          )
        }
        return (
          <Text key={token.address}>
            {amount === UNKNOWN_AMOUNT
              ? displayFloat(amount, DECIMALS_TO_DISPLAY)
              : displayFloat(
                  ethers.utils.formatUnits(amount, token.decimals),
                  DECIMALS_TO_DISPLAY,
                )}
            &nbsp;
            <EthToken token={token} />
          </Text>
        )
      })}
    </VStack>
  )
}
