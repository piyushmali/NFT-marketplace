# NFT Marketplace

**Deployed and Verified Addresses**

- [MyNFT Contract](https://www.oklink.com/amoy/address/0xdE7716eC9738330b0e05Eea6aB1F052fd0846864/contract): `0xdE7716eC9738330b0e05Eea6aB1F052fd0846864`
- [NFT Marketplace Contract](https://www.oklink.com/amoy/address/0x5eb8738ae8e23ea7c1d6e09e13037d87bb7f9466/contract): `0x5Eb8738aE8E23EA7C1D6e09E13037D87bb7F9466`

A decentralized marketplace for trading ERC721 NFTs.

## Requirements

- Node.js (v16.0.0 or later recommended)
- Hardhat (v2.14.0 or later)
- dotenv (v10.0.0 or later)
- Alchemy Account (for RPC URL)
- Oklink Account (for API key and contract verification)

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
   RPC_URL=<Your_Alchemy_RPC_URL>
   PRIVATE_KEY=<Your_Private_Key>
   OKLINK_API_KEY=<Your_Oklink_API_Key>
   ```

   - **RPC_URL**: The RPC URL for the Polygon Amoy Testnet from Alchemy.
   - **PRIVATE_KEY**: Your wallet's private key (keep this secure).
   - **OKLINK_API_KEY**: Your Oklink API key for contract verification.

4. Ensure you have the following environment variables set in your `.env` file for Hardhat configuration.

## Compile Contracts

First, compile the contracts in the `contracts` directory:

```sh
npx hardhat compile
```

## Deploy Contracts

1. Deploy the MyNFT contract:

   ```sh
   npx hardhat run scripts/deploy_MyNFT.js --network polygonAmoy
   ```

2. Deploy the NFT Marketplace contract:

   ```sh
   npx hardhat run scripts/deploy_NFTMarketplace.js --network polygonAmoy
   ```

## Verify Contracts

1. Set up the OKLINK API key for verification:

   ```sh
   npx hardhat vars set Oklink_API_key
   ```

   Paste the key in the command prompt to store the configuration variable. This ensures that the API key is set up for verification purposes.

2. Verify the deployed contract on Polygon Amoy Testnet:

   ```sh
   npx hardhat verify --network polygonAmoy <CONTRACT_ADDRESS>
   ```

   Replace `<CONTRACT_ADDRESS>` with the address of the deployed contract.

## Testing

To test the contracts, use the following command:

```sh
npx hardhat test
```

## Project Structure

- `contracts/`: Solidity contracts
- `scripts/`: Deployment scripts
- `test/`: Test scripts

## License

MIT
