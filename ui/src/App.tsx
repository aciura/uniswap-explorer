import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={'12'}>
          <Heading size={'lg'}>Uniswap Explorer</Heading>
          <Heading size={'md'}>Log in using Metamask</Heading>
          <span>Login Form</span>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
