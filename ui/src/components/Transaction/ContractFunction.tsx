import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react'
import { IUniswapTransaction } from '../../dtos/IUniswapTransaction'
import { TxInputs } from './TxInputs'

export function ContractFunction({
  transaction,
}: {
  transaction: IUniswapTransaction
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          <Text
            fontSize="md"
            width={'10rem'}
            maxWidth="12rem"
            overflow="hidden"
            textOverflow={'ellipsis'}
          >
            {transaction.function_name}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {/* <PopoverArrow /> */}
        <PopoverCloseButton />
        <PopoverHeader>{transaction.function_name}</PopoverHeader>
        <PopoverBody>
          <TxInputs list={transaction.inputs} path={transaction.path} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
