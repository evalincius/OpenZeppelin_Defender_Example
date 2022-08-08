import { ethers } from 'ethers';
import NFTMarketplaceWithMetaTransactions from '../../artifacts/contracts/NFTMarketplaceWithMetaTransactions.sol/NFTMarketplaceWithMetaTransactions.json';
import { NFTMarketplaceWithMetaTransactions as address } from '../../deploy.json';

export function createMarketplaceInstance() {
  const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com");  // testnet
  //const provider = new ethers.providers.JsonRpcProvider()  // hardhat
  return new ethers.Contract(address, NFTMarketplaceWithMetaTransactions.abi, provider);
}
