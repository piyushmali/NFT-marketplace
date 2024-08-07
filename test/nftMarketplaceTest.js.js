const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
    let MyNFT, myNFT, NFTMarketplace, nftMarketplace, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        MyNFT = await ethers.getContractFactory("MyNFT");
        myNFT = await MyNFT.deploy();
        await myNFT.deployed();

        NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        nftMarketplace = await NFTMarketplace.deploy();
        await nftMarketplace.deployed();
    });

    it("Should list, buy, and make offers on NFTs", async function () {
        // Mint an NFT
        await myNFT.createNFT("https://example.com/token1");
        const tokenId = 0;

        // List the NFT
        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, ethers.utils.parseEther("1"));

        // Check listing
        const listing = await nftMarketplace.listings(myNFT.address, tokenId);
        expect(listing.price).to.equal(ethers.utils.parseEther("1"));
        expect(listing.seller).to.equal(owner.address);

        // Make an offer
        await nftMarketplace.connect(addr1).makeOffer(myNFT.address, tokenId, { value: ethers.utils.parseEther("2") });

        // Accept the offer
        await nftMarketplace.connect(owner).acceptOffer(myNFT.address, tokenId);

        // Check new owner
        expect(await myNFT.ownerOf(tokenId)).to.equal(addr1.address);
    });

    it("Should cancel listing", async function () {
        // Mint an NFT
        await myNFT.createNFT("https://example.com/token2");
        const tokenId = 1;

        // List the NFT
        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, ethers.utils.parseEther("1"));

        // Cancel the listing
        await nftMarketplace.connect(owner).cancelListing(myNFT.address, tokenId);

        // Check listing
        const listing = await nftMarketplace.listings(myNFT.address, tokenId);
        expect(listing.price).to.equal(0);
        expect(listing.seller).to.equal(ethers.constants.AddressZero);
    });
});
