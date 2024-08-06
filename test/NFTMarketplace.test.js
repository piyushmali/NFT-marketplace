const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
  it("Should list, buy, and make an offer on an NFT", async function () {
    const [owner, buyer, offerer] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    await myNFT.deployed();

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy(myNFT.address);
    await nftMarketplace.deployed();

    await myNFT.mint("NFT Name", "NFT Description", "NFT Image URL");
    await myNFT.setApprovalForAll(nftMarketplace.address, true);

    await nftMarketplace.listNFT(0, ethers.utils.parseEther("1"));
    await nftMarketplace.connect(buyer).buyNFT(0, { value: ethers.utils.parseEther("1") });

    await myNFT.mint("NFT Name", "NFT Description", "NFT Image URL");
    await nftMarketplace.listNFT(1, ethers.utils.parseEther("1"));
    await nftMarketplace.connect(offerer).makeOffer(1, { value: ethers.utils.parseEther("0.5") });
    await nftMarketplace.connect(owner).acceptOffer(1);
  });
});
