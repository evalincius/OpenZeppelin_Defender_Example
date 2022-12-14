// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplaceWithMetaTransactions is ERC721URIStorage, ERC2771Context{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
      uint256 tokenId;
      address payable owner;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address owner
    );

    constructor(address forwarderAddress) ERC2771Context(forwarderAddress) ERC721("SkillsBlockMarketplaceTest1", "SBMTest1") {
        owner = payable(_msgSender());
    }

    function _msgSender() internal view override(Context, ERC2771Context) returns(address) {
            return ERC2771Context._msgSender();
    } 

    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) { 
            return ERC2771Context._msgData();
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory ipfsId) external payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(_msgSender(), newTokenId);
      _setTokenURI(newTokenId, ipfsId);
      createMarketItem(newTokenId);
      return newTokenId;
    }

    function createMarketItem(
      uint256 tokenId
    ) private {

      idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        payable(_msgSender())
      );

      _transfer(_msgSender(), address(this), tokenId);
      emit MarketItemCreated(
        tokenId,
        _msgSender()
      );
    }


    /* Returns all unsold market items */
    function fetchAllNfts() public view returns (MarketItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < itemCount; i++) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
      return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == _msgSender()) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == _msgSender()) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns msgSender */
    function getMsgSender() public view returns (address) {
      return _msgSender();
    }
}