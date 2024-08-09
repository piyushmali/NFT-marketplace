# NFT Marketplace

**Deployed Addresses**

- [NFT Marketplace Contract](https://www.oklink.com/amoy/address/0xd0f84d1194fd7a930072b1a54bf145e62ba99f53): `0xd0f84d1194fd7a930072b1a54bf145e62ba99f53`

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
