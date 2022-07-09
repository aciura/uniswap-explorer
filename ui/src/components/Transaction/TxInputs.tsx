import { Box, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { IFunctionInput, IToken } from '../../dtos/IUniswapTransaction'

export interface TxInputsProps {
  list: IFunctionInput[]
  path: IToken[]
}

export function TxInputs({ list, path }: TxInputsProps) {
  return (
    <Box overflow="auto">
      {list.map(input => {
        if (input.name === 'deadline') {
          const deadlineDate = new Date(
            Number.parseInt(input.value),
          ).toLocaleString()
          return (
            <Text key={input.name} fontSize={'0.9rem'}>
              {`${input.name} : ${deadlineDate}`}
            </Text>
          )
        }
        if (input.name.startsWith('amountIn')) {
          const tokenIn = path[0]
          return (
            <Text key={input.name} fontSize={'0.9rem'}>
              {input.name}: &nbsp;
              {ethers.utils.formatUnits(input.value, tokenIn.decimals)} &nbsp;
              {tokenIn.name} ({tokenIn.symbol})
            </Text>
          )
        }
        if (input.name.startsWith('amountOut')) {
          const tokenOut = path[path.length - 1]
          return (
            <Text key={input.name} fontSize={'0.9rem'}>
              {input.name}: &nbsp;
              {ethers.utils.formatUnits(input.value, tokenOut.decimals)} &nbsp;
              {tokenOut.name} ({tokenOut.symbol})
            </Text>
          )
        }
        if (input.name.startsWith('path')) {
          return (
            <Text key={input.name} fontSize={'0.9rem'}>
              {input.name}: &nbsp;
              {path.map(token => token.symbol).join(' -> ')}
            </Text>
          )
        }
        return (
          <Text
            key={input.name}
            fontSize={'0.8rem'}
          >{`${input.name} : ${input.value}`}</Text>
        )
      })}
    </Box>
  )
}
