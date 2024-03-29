import { ChakraProvider, Box, Grid } from '@chakra-ui/react'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
import { WagmiConfig } from 'wagmi'
import { ethClient } from './services/ethClient'
import { MainPage } from './components/MainPage'
import { theme } from './theme/theme'

export const App = () => (
  <ChakraProvider theme={theme}>
    <WagmiConfig client={ethClient}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <MainPage />
        </Grid>
      </Box>
    </WagmiConfig>
  </ChakraProvider>
)
