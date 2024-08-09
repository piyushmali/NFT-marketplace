const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
    let MyNFT, myNFT, NFTMarketplace, nftMarketplace, owner, addr1, addr2;

    beforeEach(async function () {
        MyNFT = await ethers.getContractFactory("MyNFT");
        myNFT = await MyNFT.deploy();
        await myNFT.deployed();

        NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        nftMarketplace = await NFTMarketplace.deploy();
        await nftMarketplace.deployed();

        [owner, addr1, addr2] = await ethers.getSigners();

        console.log("MyNFT deployed to:", myNFT.address);
        console.log("NFTMarketplace deployed to:", nftMarketplace.address);
    });

    it("Should list an NFT", async function () {
        const tokenURI = "ipfs://token_uri";
        const price = ethers.parseEther("1");

        const tx = await myNFT.createNFT(tokenURI);
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args[0].toString();

        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, price);

        const listing = await nftMarketplace.listings(myNFT.address, tokenId);
        expect(listing.price).to.equal(price);
        expect(listing.seller).to.equal(owner.address);
    });

    it("Should allow a user to buy an NFT", async function () {
        const tokenURI = "ipfs://token_uri";
        const price = ethers.parseEther("1");

        const tx = await myNFT.createNFT(tokenURI);
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args[0].toString();

        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, price);

        await nftMarketplace.connect(addr1).buyNFT(myNFT.address, tokenId, { value: price });

        const newOwner = await myNFT.ownerOf(tokenId);
        expect(newOwner).to.equal(addr1.address);
    });

    it("Should allow a user to make an offer on an NFT", async function () {
        const tokenURI = "ipfs://token_uri";
        const price = ethers.parseEther("1");

        const tx = await myNFT.createNFT(tokenURI);
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args[0].toString();

        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, price);

        const offerPrice = ethers.parseEther("0.8");
        await nftMarketplace.connect(addr1).makeOffer(myNFT.address, tokenId, { value: offerPrice });

        const offers = await nftMarketplace.offers(myNFT.address, tokenId);
        expect(offers[0].price).to.equal(offerPrice);
        expect(offers[0].buyer).to.equal(addr1.address);
    });

    it("Should allow the owner to accept an offer", async function () {
        const tokenURI = "ipfs://token_uri";
        const price = ethers.parseEther("1");

        const tx = await myNFT.createNFT(tokenURI);
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args[0].toString();

        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, price);

        const offerPrice = ethers.parseEther("0.8");
        await nftMarketplace.connect(addr1).makeOffer(myNFT.address, tokenId, { value: offerPrice });

        await nftMarketplace.connect(owner).acceptOffer(myNFT.address, tokenId, 0);

        const newOwner = await myNFT.ownerOf(tokenId);
        expect(newOwner).to.equal(addr1.address);
    });

    it("Should allow the owner to cancel a listing", async function () {
        const tokenURI = "ipfs://token_uri";
        const price = ethers.parseEther("1");

        const tx = await myNFT.createNFT(tokenURI);
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args[0].toString();

        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, price);

        await nftMarketplace.connect(owner).cancelListing(myNFT.address, tokenId);

        const listing = await nftMarketplace.listings(myNFT.address, tokenId);
        expect(listing.price).to.equal(0);
        expect(listing.seller).to.equal(ethers.constants.AddressZero);
    });

    it("Should allow users to add and withdraw funds", async function () {
        const amountToAdd = ethers.parseEther("2");

        await nftMarketplace.connect(addr1).addFunds({ value: amountToAdd });

        const userFunds = await nftMarketplace.userFunds(addr1.address);
        expect(userFunds).to.equal(amountToAdd);

        await nftMarketplace.connect(addr1).withdrawFunds();

        const userFundsAfterWithdraw = await nftMarketplace.userFunds(addr1.address);
        expect(userFundsAfterWithdraw).to.equal(0);
    });

    it("Should fail to buy an NFT with insufficient funds", async function () {
        const tokenURI = "ipfs://token_uri";
        const price = ethers.parseEther("1");

        const tx = await myNFT.createNFT(tokenURI);
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args[0].toString();

        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, price);

        const lowPrice = ethers.parseEther("0.5");

        await expect(
            nftMarketplace.connect(addr1).buyNFT(myNFT.address, tokenId, { value: lowPrice })
        ).to.be.revertedWith("Incorrect value");
    });

    it("Should fail to make an offer without sending ether", async function () {
        const tokenURI = "ipfs://token_uri";
        const price = ethers.parseEther("1");

        const tx = await myNFT.createNFT(tokenURI);
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args[0].toString();

        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, price);

        await expect(
            nftMarketplace.connect(addr1).makeOffer(myNFT.address, tokenId)
        ).to.be.revertedWith("Offer price must be greater than zero");
    });

    it("Should fail to accept an offer if not the seller", async function () {
        const tokenURI = "ipfs://token_uri";
        const price = ethers.parseEther("1");

        const tx = await myNFT.createNFT(tokenURI);
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args[0].toString();

        await myNFT.connect(owner).approve(nftMarketplace.address, tokenId);
        await nftMarketplace.connect(owner).listNFT(myNFT.address, tokenId, price);

        const offerPrice = ethers.parseEther("0.8");
        await nftMarketplace.connect(addr1).makeOffer(myNFT.address, tokenId, { value: offerPrice });

        await expect(
            nftMarketplace.connect(addr2).acceptOffer(myNFT.address, tokenId, 0)
        ).to.be.revertedWith("Not the owner");
    });
});
