// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is Ownable, ERC1155Holder {
    struct Listing {
        uint256 price;
        address seller;
        bool isActive;
    }

    struct Offer {
        uint256 offerPrice;
        address offerer;
        bool isActive;
    }

    IERC1155 public nftContract;
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Offer) public offers;

    event Listed(uint256 tokenId, uint256 price, address seller);
    event Bought(uint256 tokenId, uint256 price, address buyer);
    event OfferMade(uint256 tokenId, uint256 offerPrice, address offerer);
    event OfferAccepted(uint256 tokenId, uint256 offerPrice, address offerer);
    event ListingCancelled(uint256 tokenId, address seller);

    constructor(address _nftContract) {
        nftContract = IERC1155(_nftContract);
    }

    function listNFT(uint256 tokenId, uint256 price) public {
        require(
            nftContract.balanceOf(msg.sender, tokenId) > 0,
            "You don't own this token"
        );
        nftContract.safeTransferFrom(msg.sender, address(this), tokenId, 1, "");
        listings[tokenId] = Listing(price, msg.sender, true);
        emit Listed(tokenId, price, msg.sender);
    }

    function buyNFT(uint256 tokenId) public payable {
        Listing memory listing = listings[tokenId];
        require(listing.isActive, "Listing is not active");
        require(msg.value >= listing.price, "Insufficient payment");

        delete listings[tokenId];
        nftContract.safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
        payable(listing.seller).transfer(listing.price);
        emit Bought(tokenId, listing.price, msg.sender);
    }

    function makeOffer(uint256 tokenId) public payable {
        require(msg.value > 0, "Offer price must be greater than zero");
        offers[tokenId] = Offer(msg.value, msg.sender, true);
        emit OfferMade(tokenId, msg.value, msg.sender);
    }

    function acceptOffer(uint256 tokenId) public {
        Listing memory listing = listings[tokenId];
        Offer memory offer = offers[tokenId];

        require(listing.isActive, "Listing is not active");
        require(offer.isActive, "Offer is not active");
        require(
            msg.sender == listing.seller,
            "Only the seller can accept the offer"
        );

        delete listings[tokenId];
        delete offers[tokenId];
        nftContract.safeTransferFrom(
            address(this),
            offer.offerer,
            tokenId,
            1,
            ""
        );
        payable(listing.seller).transfer(offer.offerPrice);
        emit OfferAccepted(tokenId, offer.offerPrice, offer.offerer);
    }

    function cancelListing(uint256 tokenId) public {
        Listing memory listing = listings[tokenId];
        require(listing.isActive, "Listing is not active");
        require(
            msg.sender == listing.seller,
            "Only the seller can cancel the listing"
        );

        delete listings[tokenId];
        nftContract.safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
        emit ListingCancelled(tokenId, msg.sender);
    }
}
