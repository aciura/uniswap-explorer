import { Text } from '@chakra-ui/react'
import { IFunctionInput } from '../dtos/IUniswapTransaction'

export function TxInputs({ list }: { list: IFunctionInput[] }) {
  return (
    <div>
      {list.map(input => (
        <Text fontSize={'0.8rem'}>{`${input.name} : ${input.value}`}</Text>
      ))}
    </div>
  )
}
