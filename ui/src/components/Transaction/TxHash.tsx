import { Link, Text } from '@chakra-ui/react'

export function TxHash({ hash }: { hash: string }) {
  return (
    <Link href={`https://etherscan.io/tx/${hash}`} isExternal>
      <Text
        fontSize="md"
        maxWidth="10rem"
        overflow="hidden"
        textOverflow={'ellipsis'}
      >
        {hash}
      </Text>
      {/* <ExternalLinkIcon mx="2px" /> */}
    </Link>
  )
}
