const { ethers } = require("hardhat");

async function main() {
  const myNFTAddress = "YOUR_DEPLOYED_NFT_CONTRACT_ADDRESS"; 
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy(myNFTAddress);
  await nftMarketplace.deployed();

  console.log("NFTMarketplace deployed to:", nftMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });