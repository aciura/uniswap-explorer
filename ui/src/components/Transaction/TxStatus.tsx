import { Box } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

export function TxStatus({ status }: { status: string }) {
  return status === 'success' ? (
    <Box bgColor="green.300" py={2} px={5} rounded="6">
      <CheckIcon />
      &nbsp; Success
    </Box>
  ) : (
    <Box bgColor="red.300" py={2} px={5} rounded="6">
      <CloseIcon />
      &nbsp;Failed
    </Box>
  )
}
