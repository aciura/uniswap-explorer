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
import { useInView } from 'react-intersection-observer'
import { BlockInfo } from './BlockInfo'

export const BLOCKLIMIT = 1

export interface TransactionsProps {
  blockNumber: number
}

export const Transactions = ({ blockNumber }: TransactionsProps) => {
  const [blocks, setBlocks] = useState([blockNumber])

  const [loadMoreRef, loadMoreInView] = useInView({ threshold: 0.25 })

  const loadMoreTransactions = () => {
    setBlocks([...blocks, blocks[blocks.length - 1] - BLOCKLIMIT])
  }

  useEffect(() => {
    if (loadMoreInView) {
      loadMoreTransactions()
    }
  })

  useEffect(() => {
    if (blocks[0] < blockNumber) {
      setBlocks(_blocks => [blockNumber].concat(_blocks))
    }
  }, [blockNumber])

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
