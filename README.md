# NFT Marketplace

**Deployed Addresses**

- [MyNFT Contract](https://amoy.polygonscan.com/address/0xdE7716eC9738330b0e05Eea6aB1F052fd0846864): `0xdE7716eC9738330b0e05Eea6aB1F052fd0846864`
- [NFT Marketplace Contract](https://amoy.polygonscan.com/address/0x5eb8738ae8e23ea7c1d6e09e13037d87bb7f9466): `0x5Eb8738aE8E23EA7C1D6e09E13037D87bb7F9466`

A decentralized marketplace for trading ERC721 NFTs.

## Requirements

- Node.js
- Hardhat
- dotenv

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/piyushmali/NFT-marketplace.git
   cd NFT-marketplace
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   AMOY_RPC_URL=<Your_Amoy_RPC_URL>
   PRIVATE_KEY=<Your_Private_Key>
   ```

## Compile Contracts

```sh
npx hardhat compile
```

## Deploy Contracts

1. Deploy the MyNFT contract:

   ```sh
   npx hardhat ignition deploy ./ignition/modules/deploy_MyNFT.js --network amoy
   ```

2. Deploy the NFT Marketplace contract:

   ```sh
   npx hardhat ignition deploy ./ignition/modules/deploy_NFTMarketplace.js --network amoy
   ```

## Test Contracts

```sh
npx hardhat test
```

## Project Structure

- `contracts/`: Solidity contracts
- `scripts/`: Deployment scripts
- `test/`: Test scripts

## License

MIT
