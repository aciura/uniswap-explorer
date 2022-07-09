import { Text, Tr, Td, Spinner, Skeleton } from '@chakra-ui/react'
import { IToken, IUniswapTransaction } from '../dtos/IUniswapTransaction'
import { ethers } from 'ethers'
import { TxHash } from './Transaction/TxHash'
import { TxStatus } from './Transaction/TxStatus'
import { EthAddress } from './Transaction/EthAddress'
import useSWR from 'swr'
import { EthBlock } from './Transaction/EthBlock'
import { blockLimit, fetcher } from './Transactions'
import { displayFloat } from './utils'
import { ContractFunction } from './Transaction/ContractFunction'
import { TxPath } from './Transaction/TxPath'

export function BlockInfo({ blockNumber }: { blockNumber: number }) {
  const { data, error } = useSWR(
    `http://localhost:3001/uniswap/block/${blockNumber}?limit=${blockLimit}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  const transactions = data as IUniswapTransaction[]
  // console.log({ blockNumber, transactions })

  return (
    <>
      {!transactions && <BlockIsLoading blockNumber={blockNumber} />}
      {error && (
        <Tr>
          <Td fontSize={'sm'} isNumeric>
            <EthBlock blockNumber={blockNumber} />
          </Td>
          <Td>
            <Text colorScheme={'red'}>{error}</Text>
          </Td>
        </Tr>
      )}
      {transactions && transactions.length === 0 && (
        <BlockWithNoTransactions blockNumber={blockNumber} />
      )}
      {transactions &&
        transactions?.map((tx: IUniswapTransaction) => (
          <Tr key={tx.hash}>
            <Td fontSize={'md'} width={'6rem'} maxWidth="6rem" isNumeric>
              <EthBlock blockNumber={blockNumber} />
            </Td>
            <Td isNumeric>
              <TxHash hash={tx.hash} />
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
              width={'10rem'}
              maxWidth="10rem"
              overflow="hidden"
              textOverflow={'ellipsis'}
            >
              {displayFloat(ethers.utils.formatEther(tx.eth_value), 4)} ETH
            </Td>
            <Td>
              <ContractFunction transaction={tx} />
            </Td>
            <Td>
              <TxPath transaction={tx} />
            </Td>
          </Tr>
        ))}
    </>
  )

  function BlockWithNoTransactions({ blockNumber }: { blockNumber: number }) {
    return (
      <Tr key={blockNumber}>
        <Td fontSize={'md'} width={'6rem'} maxWidth="6rem" isNumeric>
          <EthBlock blockNumber={blockNumber} />
        </Td>
        <Td isNumeric>
          <Text fontSize={'md'}>No Uniswap Transactions</Text>
        </Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
      </Tr>
    )
  }
}

function BlockIsLoading({ blockNumber }: { blockNumber: number }) {
  return (
    <Tr>
      <Td fontSize={'sm'} isNumeric>
        <EthBlock blockNumber={blockNumber} />
      </Td>
      <Td>
        <Spinner
          thickness="8px"
          speed="1s"
          emptyColor="gray.200"
          color="blue.800"
          size="xl"
        />
      </Td>
      <Td>
        <Skeleton />
      </Td>
      <Td>
        <Skeleton />
      </Td>
      <Td>
        <Skeleton />
      </Td>
      <Td>
        <Skeleton />
      </Td>
      <Td>
        <Skeleton />
      </Td>
    </Tr>
  )
}
