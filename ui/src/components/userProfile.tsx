import { Text, Box, Button, HStack, Spinner } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { ReactComponent as MetaMaskSvg } from '../images/metamask.svg'
import { EthAddress } from './Transaction/EthAddress'

export function UserProfile() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <HStack spacing="1rem">
        <Box fontSize={'1rem'}>
          {ensName ? (
            `${ensName} (${address})`
          ) : (
            <EthAddress address={address ?? ''} />
          )}
        </Box>
        <Button colorScheme={'blue'} onClick={() => disconnect()}>
          Disconnect
        </Button>
      </HStack>
    )
  }

  const metaMaskConnector = connectors[0]

  return (
    <Box>
      <Button
        height={'3rem'}
        disabled={!metaMaskConnector.ready}
        onClick={() => connect({ connector: metaMaskConnector })}
      >
        {isLoading && metaMaskConnector.id === pendingConnector?.id && (
          <>
            <Text>Connecting...</Text>
            <Spinner size="sm" />
          </>
        )}
        <MetaMaskSvg height={'3rem'} width={'10rem'} />
      </Button>

      {error && <Text color={'red.200'}>{error.message}</Text>}
    </Box>
  )
}
