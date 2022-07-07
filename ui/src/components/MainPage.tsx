import { Box, VStack, Heading, Flex, background } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { Transactions } from './Transactions'
import { UserProfile } from './userProfile'

export function MainPage() {
  const { isConnected } = useAccount()
  return (
    <Flex height={'100vh'} alignItems="flex-start" justifyContent={'center'}>
      <VStack spacing={6} background="grey.200" p={12} rounded={6}>
        <Heading size={'lg'}>Uniswap Explorer</Heading>
        {!isConnected && (
          <Heading size={'sm'}>
            To display transactions please log in using Metamask
          </Heading>
        )}
        <UserProfile />

        {isConnected && <Transactions />}
      </VStack>
    </Flex>
  )
}
