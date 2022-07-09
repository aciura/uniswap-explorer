# Uniswap explorer

Full stack application, that displays historical data of a Uniswap contract.
User has to login with metamask before querying the data.

## Backend

Backend is implemented in `/api`

### To start run: `yarn run start` in /api

- Backend starts on [http://localhost:3001](http://localhost:3001)
- Backend is implemented with TypeScript using [NestJs](https://nestjs.com/) with expressJs engine
- The data is fetched by the backend using [ethers.js](https://docs.ethers.io/v5/single-page/)
- https://docs.nestjs.com/techniques/caching add a cache for the queries on the backend side

## Frontend

Frontend is implemented in `/ui` using ReactJs

### To start run `yarn run start` in /ui

- Frontend start on [http://localhost:3000](http://localhost:3000)
- The frontend displays historical data coming back from the backend API
- Implemented in TypeScript
- UI Components using [chakra-ui](https://chakra-ui.com/)
- Data fetching is done using [swr](https://swr.vercel.app/)
- Metamask login is using [wagmi](https://wagmi.sh/)
- Project uses some utils from ethers.js

### Helpful links

- Uniswap V2, solidity Implementation → [trading-from-a-smart-contract](https://docs.uniswap.org/protocol/V2/guides/smart-contract-integration/trading-from-a-smart-contract)
- Ropsten swap router address example → [Uniswap V2 Router 02 on Ropsten](https://ropsten.etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D)
