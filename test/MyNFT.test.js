const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT", async function () {
    const [addr1, addr2] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    await myNFT.deployed();

    await myNFT.mint("NFT Name", "NFT Description", "NFT Image URL");

    expect(await myNFT.balanceOf(addr1.address, 0)).to.equal(1);

    await myNFT.safeTransferFrom(addr1.address, addr2.address, 0, 1, []);

    expect(await myNFT.balanceOf(addr2.address, 0)).to.equal(1);
  });
});
