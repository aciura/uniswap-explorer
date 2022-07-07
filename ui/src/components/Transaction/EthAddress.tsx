import { Link, Text } from '@chakra-ui/react'

export function EthAddress({ address }: { address: string }) {
  return (
    <Link href={`https://etherscan.io/address/${address}`} isExternal>
      <Text
        fontSize="sm"
        maxWidth="10rem"
        overflowX="hidden"
        textOverflow={'ellipsis'}
      >
        {address}
      </Text>
    </Link>
  )
}
