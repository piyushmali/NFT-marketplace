const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const NFTMarketplaceModule = buildModule("NFTMarketplaceModule", (m) => {
  const nFTMarketplace = m.contract("NFTMarketplace");

  return { nFTMarketplace };
});

module.exports = NFTMarketplaceModule;


// MacBook-Air NFT-marketplace % npx hardhat ignition deploy ./ignition/modules/deploy_NFTMarketplace.js --network amoy

// ✔ Confirm deploy to network amoy (80002)? … yes
// Hardhat Ignition 🚀

// Deploying [ NFTMarketplaceModule ]

// Batch #1
//   Executed NFTMarketplaceModule#NFTMarketplace

// [ NFTMarketplaceModule ] successfully deployed 🚀

// Deployed Addresses

// NFTMarketplaceModule#NFTMarketplace - 0xd0F84d1194fd7a930072B1a54bF145E62bA99f53