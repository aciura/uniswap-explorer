import { Link, Text } from '@chakra-ui/react'

export function EthAddress({ address }: { address: string }) {
  return (
    <Link href={`https://etherscan.io/address/${address}`} isExternal>
      <Text
        fontSize="md"
        maxWidth="10rem"
        overflow="hidden"
        textOverflow={'ellipsis'}
        overflowWrap="normal"
      >
        {address}
      </Text>
    </Link>
  )
}
