import { Link, Text } from '@chakra-ui/react'

export function EthBlock({ blockNumber }: { blockNumber: number }) {
  return (
    <Link href={`https://etherscan.io/block/${blockNumber}`} isExternal>
      <Text
        fontSize="md"
        width={'6rem'}
        maxWidth="6rem"
        overflow="hidden"
        textOverflow={'ellipsis'}
      >
        {blockNumber}
      </Text>
    </Link>
  )
}
