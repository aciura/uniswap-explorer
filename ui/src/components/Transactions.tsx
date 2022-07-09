import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Button,
  Spinner,
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import { useBlockNumber } from 'wagmi'
import { useInView } from 'react-intersection-observer'
import { BlockInfo } from './BlockInfo'

export const fetcher = (url: string) => fetch(url).then(res => res.json())
export const blockLimit = 1

export const Transactions = () => {
  // const {
  //   data: blockNumber,
  //   isError,
  //   isLoading,
  // } = useBlockNumber({ watch: true })

  const [loadMoreRef, loadMoreInView] = useInView({ threshold: 0.25 })

  useEffect(() => {
    if (loadMoreInView) {
      loadMoreTransactions()
    }
  })

  const blockNumber = 15095995
  const [blocks, setBlocks] = useState([blockNumber])

  console.log('Transactions render', { blocks })

  const loadMoreTransactions = () => {
    setBlocks([...blocks, blocks[blocks.length - 1] - blockLimit])
  }

  return (
    <TableContainer>
      <Table size={'md'} variant="striped" colorScheme="gray" rounded={16}>
        <TableCaption placement="top">
          List of Uniswap V2 Transactions starting from block {blockNumber}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>BlockNumber</Th>
            <Th>Hash</Th>
            <Th>From/To</Th>
            <Th>Status</Th>
            <Th>Eth</Th>
            <Th>Function</Th>
            <Th>Path</Th>
          </Tr>
        </Thead>
        <Tbody>
          {blocks.map(block => (
            <BlockInfo key={block} blockNumber={block} />
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>
              <Button ref={loadMoreRef} onClick={loadMoreTransactions}>
                Load more
              </Button>
            </Th>
            <Th>
              <Spinner />
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}
