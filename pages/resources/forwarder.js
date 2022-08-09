import { ethers } from 'ethers';
import Forwarder from '../../artifacts/contracts/Forwarder.sol/Forwarder.json';
import Web3Modal from 'web3modal';
export async function createForwarderInstance() {
  const address = process.env.FORWARDER_SMART_CONTRACT;
  // const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com");  // testnet
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  return new ethers.Contract(address, Forwarder.abi, provider);
}
