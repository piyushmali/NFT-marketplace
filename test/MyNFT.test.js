const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  let MyNFT, myNFT, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy(); 
  });

  it("Should deploy and have correct initial settings", async function () {
    expect(await myNFT.name()).to.equal("MyNFT");
    expect(await myNFT.symbol()).to.equal("MNFT");
    expect(await myNFT.tokenCounter()).to.equal(0);
  });

  it("Should mint a new NFT", async function () {
    const tokenURI = "https://mytoken.com/metadata/1";
    await myNFT.createNFT(tokenURI);
    expect(await myNFT.tokenCounter()).to.equal(1);

    const ownerOfToken = await myNFT.ownerOf(0);
    expect(ownerOfToken).to.equal(owner.address);

    const storedTokenURI = await myNFT.tokenURI(0);
    expect(storedTokenURI).to.equal(tokenURI);
  });

  it("Should mint and transfer the NFT", async function () {
    const tokenURI = "https://mytoken.com/metadata/2";
    await myNFT.createNFT(tokenURI);
    await myNFT.transferFrom(owner.address, addr1.address, 0);

    const ownerOfToken = await myNFT.ownerOf(0);
    expect(ownerOfToken).to.equal(addr1.address);
  });
});
