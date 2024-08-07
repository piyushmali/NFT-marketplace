const hre = require("hardhat");

async function main() {
    const MyNFT = await hre.ethers.getContractFactory("MyNFT");
    console.log("Deploying MyNFT...");

    const myNFT = await MyNFT.deploy();
    
    console.log("Waiting for deployment to be mined...");
    await myNFT.deployed(); 

    console.log("MyNFT deployed to:", myNFT.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
