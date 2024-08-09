const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const NFTMarketplaceModule = buildModule("NFTMarketplaceModule", (m) => {
  const nFTMarketplace = m.contract("NFTMarketplace");

  return { nFTMarketplace };
});

module.exports = NFTMarketplaceModule;
