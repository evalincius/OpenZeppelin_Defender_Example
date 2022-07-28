import { ethers } from 'ethers';
import Forwarder from '../../artifacts/contracts/Forwarder.sol/Forwarder.json'
import { Forwarder as address } from '../../deploy.json';

export function createForwarderInstance() {
  const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")  // testnet
  //const provider = new ethers.providers.JsonRpcProvider()  // hardhat
  return new ethers.Contract(address, Forwarder.abi, provider);
}
