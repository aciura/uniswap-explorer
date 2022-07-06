import useSWR from 'swr'
import {
  Text,
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import { IUniswapTransaction } from '../dtos/IUniswapTransaction'
import { Fragment } from 'react'
import { BigNumber } from 'ethers'
import { ethers } from 'ethers'
import { TxHash } from './TxHash'
import { TxInputs } from './TxInputs'
import { TxStatus } from './TxStatus'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const Transactions = () => {
  const { data, error } = useSWR(
    'http://localhost:3000/uniswap/block/15081614/limit/5',
    fetcher,
  )
  const transactions = (data as IUniswapTransaction[])?.sort(
    (a, b) => b.blockNumber - a.blockNumber,
  )
  console.log({ transactions, error })
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="red" rounded={'xl'}>
        <TableCaption>List of Uniswap Transactions</TableCaption>
        <Thead>
          <Tr>
            <Th>Hash</Th>
            <Th>BlockNumber</Th>
            {/* <Th isNumeric>Time</Th> */}
            <Th>From</Th>
            <Th>Status</Th>
            <Th>Function</Th>
            <Th>Path</Th>
            <Th>Inputs</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions &&
            transactions?.map(tx => (
              <Tr key={tx.hash}>
                <Td isNumeric>
                  <TxHash hash={tx.hash} />
                </Td>
                <Td fontSize={'sm'} isNumeric>
                  {tx.blockNumber}
                </Td>
                <Td isNumeric fontSize={'0.8rem'}>
                  {tx.from}
                </Td>
                <Td>
                  <TxStatus status={tx.status} />
                </Td>
                <Td>{tx.function_name}</Td>
                <Td>
                  {tx.path.map(token => (
                    <Text key={token.address} mx={'0.1rem'}>
                      {token.symbol}
                    </Text>
                  ))}
                </Td>
                <Td>
                  <TxInputs list={tx.inputs} />
                </Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}
