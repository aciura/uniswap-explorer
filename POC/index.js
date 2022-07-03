const { ethers } = require('ethers')
const dotenv = require('dotenv')
// const { ChainId, Fetcher } = require('@uniswap/sdk')
const abi_IUniswapV2Router02 = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')

const uniswapV2Router02Address = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

const uniswapV2Router02Interface = new ethers.utils.Interface(
  abi_IUniswapV2Router02.abi,
)

const abi_erc20 = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
]

const provider = new ethers.providers.InfuraProvider(
  process.env.ETHEREUM_NETWORK,
  process.env.INFURA_PROJECT_ID,
)

async function handleTransaction(tx) {
  console.log('\n\r$$$ transaction', tx.hash)
  console.log('from:', tx.from)
  console.log('value', tx.value.toString())
  const txDescription = uniswapV2Router02Interface.parseTransaction({
    data: tx.data,
    value: tx.value,
  })

  console.log({
    function_name: txDescription.name,
    from: tx.from,
    to: tx.to,
    valueETH: tx.value.toString(),
  })

  const inputs =
    uniswapV2Router02Interface.functions[txDescription.signature].inputs

  inputs.forEach(input => {
    console.log('Input:', input.name, txDescription.args[input.name].toString())
  })

  const path = txDescription.args.path
  if (path && path.length) {
    let tokensPromise = path.map(tokenAddress =>
      getTokenFromAddress(tokenAddress),
    )
    const tokens = await Promise.all(tokensPromise)
    console.log('path tokens:', tokens)
  }

  // console.log(
  //   'outputs',
  //   uniswapV2Router02Interface.functions[txDescription.signature].outputs,
  // )
  // uniswapV2Router02Interface.functions[
  //   txDescription.signature
  // ].outputs.forEach(output => {
  //   console.log('Output', {
  //     name: output.name,
  //     value: txDescription.args[output.name],
  //   })
  // })
  try {
    const txReceipt = await tx.wait()
    console.log('TX Status', txReceipt.status)

    // txReceipt.logs.forEach(log => {
    //   const parsedLog = uniswapV2Router02Interface.parseLog(log)
    //   console.log('parsedLog', parsedLog)
    // })
  } catch (error) {
    console.error('TransactionReceipt :( ', error)
  }
}

async function getTokenFromAddress(tokenAddress) {
  const tokenContract = new ethers.Contract(tokenAddress, abi_erc20, provider)
  const name = await tokenContract.name()
  const symbol = await tokenContract.symbol()
  const decimals = await tokenContract.decimals()

  return { name, symbol, decimals, address: tokenAddress }
}

const main = async () => {
  let currentBlockNumber = await provider.getBlockNumber()
  let limit = 5

  while (limit-- > 0) {
    const blockWithTransactions = await provider.getBlockWithTransactions(
      currentBlockNumber--,
    )

    console.log('>> block number', blockWithTransactions.number)
    const routerIncomingTransactions =
      blockWithTransactions.transactions.filter(
        transResponse => transResponse.to === uniswapV2Router02Address,
      )
    const transactionInfo = routerIncomingTransactions.map(tx =>
      handleTransaction(tx),
    )
    await Promise.allSettled(transactionInfo)
  }
}

dotenv.config()
main()
