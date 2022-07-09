import { Box, useColorModeValue } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

export function TxStatus({ status }: { status: string }) {
  const successColor = useColorModeValue('green.100', 'green.300')
  const failureColor = useColorModeValue('red.100', 'red.300')
  return status === 'success' ? (
    <Box fontSize={'md'} bgColor={successColor} py={2} px={5} rounded="6">
      <CheckIcon />
      &nbsp;Success
    </Box>
  ) : (
    <Box fontSize={'md'} bgColor={failureColor} py={2} px={5} rounded="6">
      <CloseIcon />
      &nbsp;Failed
    </Box>
  )
}
