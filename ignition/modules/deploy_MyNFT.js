const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const MyNFTModule = buildModule("MyNFTModule", (m) => {
  console.log("Starting deployment of MyNFT contract...");

  const myNFT = m.contract("MyNFT");

  console.log("MyNFT contract deployed at address:", myNFT.address);

  return { myNFT };
});

module.exports = MyNFTModule;
