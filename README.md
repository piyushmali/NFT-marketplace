# NFT Marketplace

This project is an NFT marketplace where users can list ERC1155 NFTs for sale, buy listed NFTs, and make offers on listed NFTs.

````

## Setup

1. **Install dependencies**:

```sh
npm install
````

2. **Configure environment variables**:

Create a `.env` file in the root directory and add:

```env
AMOY_RPC_URL=<Your_Amoy_Testnet_URL>
PRIVATE_KEY=<Your_Private_Key>
```

## Deployment

1. **Compile contracts**:

```sh
npx hardhat compile
```

2. **Deploy MyNFT contract**:

```sh
npx hardhat run scripts/deployNFT.js --network amoy
```

3. **Deploy NFTMarketplace contract**:

Update `deployMarketplace.js` with the deployed MyNFT contract address and run:

```sh
npx hardhat run scripts/deployMarketplace.js --network amoy
```

## Testing

Run tests to ensure contract functionality:

```sh
npx hardhat test
```

## License

This project is licensed under the MIT License.
