import { Link } from '@chakra-ui/react'
import { IToken } from '../../dtos/IUniswapTransaction'

export function EthToken({ token }: { token: IToken }) {
  return (
    <Link href={`https://etherscan.io/token/${token.address}`} isExternal>
      {token.name} ({token.symbol})
    </Link>
  )
}
