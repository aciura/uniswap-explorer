// import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
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
  Spinner,
  Skeleton,
  Button,
} from '@chakra-ui/react'

import { IToken, IUniswapTransaction } from '../dtos/IUniswapTransaction'
import { Fragment, useEffect } from 'react'
import { BigNumber } from 'ethers'
import { ethers } from 'ethers'
import { useBlockNumber } from 'wagmi'
import { TxHash } from './Transaction/TxHash'
import { TxInputs } from './Transaction/TxInputs'
import { TxStatus } from './Transaction/TxStatus'
import { EthAddress } from './Transaction/EthAddress'
import { useInView } from 'react-intersection-observer'

const fetcher = (url: string) => fetch(url).then(res => res.json())
const blockLimit = 5

export const Transactions = () => {
  // const {
  //   data: blockNumber,
  //   isError,
  //   isLoading,
  // } = useBlockNumber({ watch: true })

  const [loadMoreRef, loadMoreInView] = useInView({ threshold: 0.25 })
  useEffect(() => {
    loadMoreTransactions()
  }, [loadMoreInView])
  //TODO:
  const blockNumber = 15096000

  console.log('Transactions render', { blockNumber })

  const {
    data: apiData,
    error,
    mutate,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index: number) => {
      const newBlockNumber = blockNumber - blockLimit * index
      console.log('useSWRInfinite', { index, newBlockNumber })
      return `http://localhost:3001/uniswap/block/${newBlockNumber}?limit=${blockLimit}`
    },
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  const isLoadingInitialData = !apiData && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && apiData && typeof apiData[size - 1] === 'undefined')
  console.log({
    apiData,
    error,
    size,
    isValidating,
    isLoadingInitialData,
    isLoadingMore,
  })
  // const { data, error } = useSWR(
  //   `http://localhost:3001/uniswap/block/${blockNumber}?limit=5`,
  //   fetcher,
  // )
  const transactions = apiData
    ? ([].concat(...apiData) as IUniswapTransaction[]).sort(
        (a, b) => b.blockNumber - a.blockNumber,
      )
    : ([] as IUniswapTransaction[])

  console.log({ transactions, error })

  const loadMoreTransactions = () => {
    setSize(size + 1)
  }

  return (
    <>
      {!transactions && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      <TableContainer>
        <Table variant="striped" colorScheme="blue" rounded={16}>
          <TableCaption>List of Uniswap Transactions</TableCaption>
          <Thead>
            <Tr>
              <Th>Hash</Th>
              <Th>BlockNumber</Th>
              {/* <Th isNumeric>Time</Th> */}
              <Th>From/To</Th>
              <Th>Status</Th>
              <Th>Eth</Th>
              <Th>Function</Th>
              <Th>Path</Th>
              <Th>Inputs</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!transactions && (
              <>
                <Tr>
                  <Td>
                    <Skeleton height="3rem" width={'100rem'} />
                  </Td>
                  <Td>
                    <Skeleton height="3rem" width={'100rem'} />
                  </Td>
                  <Td>
                    <Skeleton height="3rem" width={'100rem'} />
                  </Td>
                </Tr>
              </>
            )}
            {transactions &&
              transactions?.map((tx: IUniswapTransaction) => (
                <Tr key={tx.hash}>
                  <Td isNumeric>
                    <TxHash hash={tx.hash} />
                  </Td>
                  <Td fontSize={'sm'} isNumeric>
                    {tx.blockNumber}
                  </Td>
                  <Td isNumeric fontSize={'0.8rem'}>
                    <>
                      <EthAddress address={tx.from} />
                      <EthAddress address={tx.to} />
                    </>
                  </Td>
                  <Td>
                    <TxStatus status={tx.status} />
                  </Td>
                  <Td
                    fontSize="md"
                    maxWidth="10rem"
                    overflowX="hidden"
                    textOverflow={'ellipsis'}
                  >
                    {ethers.utils.formatEther(tx.eth_value)} ETH
                  </Td>
                  <Td>
                    <Text
                      fontSize="md"
                      maxWidth="12rem"
                      overflowX="hidden"
                      textOverflow={'ellipsis'}
                    >
                      {tx.function_name}
                    </Text>
                  </Td>
                  <Td>
                    {tx.path.map((token: IToken) => (
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
              <Th>
                <Button ref={loadMoreRef} onClick={loadMoreTransactions}>
                  Load more
                </Button>
              </Th>
              <Th>
                {(isLoadingInitialData || isLoadingMore || isValidating) && (
                  <Spinner size={'md'} />
                )}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  )
}
