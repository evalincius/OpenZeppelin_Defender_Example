import { ethers } from 'ethers';
import contractAbi from './contract-abis.json';
import Web3Modal from 'web3modal';

export async function  createMarketplaceInstance() {
  const address = process.env.MARKETPLACE_SMART_CONTRACT;
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  return new ethers.Contract(address, contractAbi.marketplaceAbi, provider);
}
