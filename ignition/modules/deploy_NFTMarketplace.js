const hre = require("hardhat");

async function main() {
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    console.log("Deploying NFTMarketplace...");

    const nftMarketplace = await NFTMarketplace.deploy();
    
    console.log("Waiting for deployment to be mined...");
    await nftMarketplace.deployed(); 

    console.log("NFTMarketplace deployed to:", nftMarketplace.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});