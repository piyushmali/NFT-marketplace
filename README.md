# NFT Marketplace

## Overview

A decentralized marketplace for trading NFTs. Built with Solidity for smart contracts and Hardhat for deployment and testing.

## Features

- **ERC721-based NFTs**: Mint and trade ERC721 tokens.
- **Marketplace**: List, buy, and make offers on NFTs.
- **Ownership**: Only sellers can cancel listings and accept offers.

## Smart Contracts

### `MyNFT.sol`

- **Mint NFTs**: Create new NFTs with metadata.
- **Inherits**: `ERC721URIStorage`, `Ownable`.

### `NFTMarketplace.sol`

- **List NFTs**: Put NFTs up for sale.
- **Buy NFTs**: Purchase listed NFTs.
- **Offers**: Make and accept offers on NFTs.
- **Cancel Listings**: Remove NFTs from sale.

## Deployment

1. **Compile Contracts**:

   ```bash
   npx hardhat compile
   ```

2. **Deploy Contracts**:

   ```bash
   npx hardhat run scripts/deploy_NFTMarketplace.js --network <network_name>
   ```

   Replace `<network_name>` with your desired network (e.g., `amoy`).

## Testing

Run tests using Hardhat:

```bash
npx hardhat test
```

## Requirements

- Node.js
- Hardhat
- OpenZeppelin Contracts

## License

MIT License
