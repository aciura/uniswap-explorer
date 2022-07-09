import { extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bgGradient: mode(
          'linear(to-r, blue.50 0%, blue.100 25%, pink.50 100%)',
          'linear(to-r, gray.700 0%, gray.800 50%, blue.900 100%)',
        )(props),
      },
    }),
  },
})
