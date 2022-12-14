import { ethers } from 'ethers';
import { useEffect } from 'react';

export default function InitWalletComponent() {

  useEffect(() => {
    init();
  }, []);


  async function init() {
    if (!window.ethereum) throw new Error(`User wallet not found`);

    await window.ethereum.enable();
    const userProvider = new ethers.providers.Web3Provider(window.ethereum);
    const userNetwork = await userProvider.getNetwork();
    console.log(`Current user wallet chain id is: ${userNetwork.chainId.toString()}`);
    console.log(`Current configured chain id is: ${process.env.CHAIN_ID}`);
    if (userNetwork.chainId.toString() !== process.env.CHAIN_ID) throw new Error(`Please switch Wallet to ${process.env.ENVIRONMENT} network and Reload this page.`);
  }

  return (<div></div>);
}
