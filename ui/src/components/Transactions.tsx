import useSWR from 'swr'
import {
  Link,
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
      <Table variant="striped" colorScheme="red">
        <TableCaption>List of Uniswap Transactions</TableCaption>
        <Thead>
          <Tr>
            <Th>Hash</Th>
            <Th>BlockNumber</Th>
            <Th isNumeric>Time</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Function</Th>
            <Th>Inputs</Th>
            <Th>Path</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions &&
            transactions?.map(tx => (
              <Tr key={tx.hash}>
                <Td>
                  <Link href={`https://etherscan.io/tx/${tx.hash}`} isExternal>
                    {tx.hash} <ExternalLinkIcon mx="2px" />
                  </Link>
                </Td>
                <Td isNumeric>{tx.blockNumber}</Td>
                <Td isNumeric>{tx.timestamp}</Td>
                <Td>{tx.from}</Td>
                <Td>{tx.to}</Td>
                <Td>{tx.function_name}</Td>
                <Td>Inputs</Td>
                <Td>
                  {tx.path.map(token => (
                    <Text key={token.address} mx={'0.1rem'}>
                      {token.symbol}
                    </Text>
                  ))}
                </Td>
                <Td>{tx.status}</Td>
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
