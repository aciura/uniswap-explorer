import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  extendTheme,
} from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
import { WagmiConfig } from 'wagmi'
import { ethClient } from './services/ethClient'
import { MainPage } from './components/MainPage'

const overrides = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bgGradient: mode(
          'linear(to-r, blue.50 0%, blue.100 25%, pink.50 100%)',
          'linear(to-r, gray.700 0%, gray.800 50%, blue.900 100%)',
        )(props),
        // background: 'linear-gradient(blue.100 0%, grey.100 25%, black.100 50%)',
        // lineHeight: 'base',
      },
    }),
  },
})

export const App = () => (
  <ChakraProvider theme={overrides}>
    <WagmiConfig client={ethClient}>
      <Box
        textAlign="center"
        fontSize="xl"
        // bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
      >
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <MainPage />
        </Grid>
      </Box>
    </WagmiConfig>
  </ChakraProvider>
)
