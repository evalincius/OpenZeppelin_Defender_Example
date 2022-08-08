import { ethers } from 'ethers';
import NFTMarketplaceWithMetaTransactions from '../../artifacts/contracts/NFTMarketplaceWithMetaTransactions.sol/NFTMarketplaceWithMetaTransactions.json';

export function createMarketplaceInstance() {
  const address = process.env.MARKETPLACE_SMART_CONTRACT;
  console.log(`Marketplace address: ${address}`);

  const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com");  // testnet
  //const provider = new ethers.providers.JsonRpcProvider()  // hardhat
  return new ethers.Contract(address, NFTMarketplaceWithMetaTransactions.abi, provider);
}
