import { VStack, Heading, Flex, Spinner, Text } from '@chakra-ui/react'
import { useAccount, useBlockNumber } from 'wagmi'
import { Transactions } from './Transactions'
import { UserProfile } from './userProfile'
import { ReactComponent as UniswapLogo } from '../images/uniswap.svg'

export function MainPage() {
  const { isConnected } = useAccount()
  const {
    data: blockNumber,
    isError,
    isLoading,
    error,
  } = useBlockNumber({ watch: false })

  return (
    <Flex height={'100vh'} alignItems="flex-start" justifyContent={'center'}>
      <VStack spacing={6} background="grey.200" p={6} rounded={6}>
        <Heading orientation="horizontal" size={'lg'}>
          <UniswapLogo style={{ display: 'inline' }} /> Uniswap Explorer
        </Heading>
        {!isConnected && (
          <Heading size={'sm'}>
            To display transactions please log in using Metamask
          </Heading>
        )}
        <UserProfile />

        {isLoading && <Spinner size={'xl'} />}
        {isError && error && <Text colorScheme={'red'}>{error.message}</Text>}

        {isConnected && blockNumber && (
          <Transactions blockNumber={blockNumber} />
        )}
      </VStack>
    </Flex>
  )
}
