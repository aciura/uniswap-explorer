import {
  ChakraProvider,
  Box,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
import { Transactions } from './components/Transactions'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={'12'}>
          <Heading size={'lg'}>Uniswap Explorer</Heading>
          <Heading size={'md'}>Log in using Metamask</Heading>
          <Transactions />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
