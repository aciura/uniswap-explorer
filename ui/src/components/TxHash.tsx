import { Link, Text } from '@chakra-ui/react'

export function TxHash({ hash }: { hash: string }) {
  return (
    <Link href={`https://etherscan.io/tx/${hash}`} isExternal>
      <Text
        fontSize="xs"
        maxWidth="10rem"
        overflowX="hidden"
        textOverflow={'ellipsis'}
      >
        {hash}
      </Text>
      {/* <ExternalLinkIcon mx="2px" /> */}
    </Link>
  )
}
