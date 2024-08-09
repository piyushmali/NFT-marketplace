const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
  let MyNFT, myNFT, NFTMarketplace, nftMarketplace, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();
    console.log("MyNFT deployed to:", myNFT.address);

    NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.waitForDeployment();
    console.log("NFTMarketplace deployed to:", nftMarketplace.address);

    expect(myNFT.address).to.not.be.undefined;
    expect(nftMarketplace.address).to.not.be.undefined;

    const tokenURI = "https://mytoken.com/metadata/1";
    await myNFT.createNFT(tokenURI);
    console.log("NFT minted with token ID: 0");

    await myNFT.connect(owner).approve(nftMarketplace.address, 0);
    console.log("Marketplace approved to transfer NFT");

    await nftMarketplace.connect(owner).listNFT(myNFT.address, 0, ethers.utils.parseEther("1"));
    console.log("NFT listed for sale");
  });

  it("Should list and buy an NFT", async function () {
    await nftMarketplace.connect(addr1).buyNFT(myNFT.address, 0, { value: ethers.utils.parseEther("1") });
    console.log("NFT purchased");

    const newOwner = await myNFT.ownerOf(0);
    expect(newOwner).to.equal(addr1.address);
  });

  it("Should make and accept an offer", async function () {
    await nftMarketplace.connect(addr1).makeOffer(myNFT.address, 0, { value: ethers.utils.parseEther("0.5") });
    console.log("Offer made");

    await nftMarketplace.connect(owner).acceptOffer(myNFT.address, 0);
    console.log("Offer accepted");

    const newOwner = await myNFT.ownerOf(0);
    expect(newOwner).to.equal(addr1.address);
  });

  it("Should cancel a listing", async function () {
    await nftMarketplace.connect(owner).cancelListing(myNFT.address, 0);
    console.log("Listing cancelled");

    const listing = await nftMarketplace.listings(myNFT.address, 0);
    expect(listing.price).to.equal(0);
  });
});
