import { ethers } from 'ethers';
import Forwarder from '../../artifacts/contracts/Forwarder.sol/Forwarder.json';

export function createForwarderInstance() {
  const address = process.env.FORWARDER_SMART_CONTRACT;
  console.log(`asdasd: ${process.env.CHAIN_ID}`)

  console.log(`Forwarder address: ${address}`);
  const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com");  // testnet
  return new ethers.Contract(address, Forwarder.abi, provider);
}
