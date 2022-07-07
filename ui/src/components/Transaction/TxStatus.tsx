import { Box } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

export function TxStatus({ status }: { status: string }) {
  return status === 'success' ? (
    <Box bgColor="green.100" py={'3'} px={'6'} rounded="6">
      <CheckIcon />
      &nbsp; Success
    </Box>
  ) : (
    <Box bgColor="red.100" py={'3'} px={'6'} rounded="6">
      <CloseIcon />
      &nbsp;Failed
    </Box>
  )
}
