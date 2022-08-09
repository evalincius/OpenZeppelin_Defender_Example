import { ethers } from 'ethers';
import NFTMarketplaceWithMetaTransactions from '../../artifacts/contracts/NFTMarketplaceWithMetaTransactions.sol/NFTMarketplaceWithMetaTransactions.json';
import Web3Modal from 'web3modal';

export async function  createMarketplaceInstance() {
  const address = process.env.MARKETPLACE_SMART_CONTRACT;
  console.log(`Marketplace address: ${address}`);

  // const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com");  // testnet
  // //const provider = new ethers.providers.JsonRpcProvider()  // hardhat
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  return new ethers.Contract(address, NFTMarketplaceWithMetaTransactions.abi, provider);
}
