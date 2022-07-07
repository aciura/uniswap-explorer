import { Box, Text, VStack } from '@chakra-ui/react'
import { IFunctionInput } from '../../dtos/IUniswapTransaction'

export function TxInputs({ list }: { list: IFunctionInput[] }) {
  return (
    <Box maxWidth="12rem" overflowX="hidden" textOverflow={'ellipsis'}>
      {list.map(input => (
        <Text
          key={input.name}
          fontSize={'0.8rem'}
          // ethers.utils.formatUnits(value, decimals)
        >{`${input.name} : ${input.value}`}</Text>
      ))}
    </Box>
  )
}
