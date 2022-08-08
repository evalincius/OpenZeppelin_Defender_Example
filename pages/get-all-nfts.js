import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from "web3modal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import NFTMarketplace from '../artifacts/contracts/NFTMarketplaceWithMetaTransactions.sol/NFTMarketplaceWithMetaTransactions.json';

export default function GetAllNFTs() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');

  const marketplaceAddress = process.env.MARKETPLACE_SMART_CONTRACT;

  console.log(marketplaceAddress);
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    
    /* next, create the item */
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);

    const data = await contract.fetchAllNfts();

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let item = {
        tokenId: i.tokenId.toNumber(),
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      };
      return item;
    }));

    setNfts(items);
    setLoadingState('loaded');
  }

  // async function buyNft(nft) {
  //   /* needs the user to sign the transaction, so will use Web3Provider and sign it */
  //   const web3Modal = new Web3Modal()
  //   const connection = await web3Modal.connect()
  //   const provider = new ethers.providers.Web3Provider(connection)
  //   const signer = provider.getSigner()
  //   const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

  //   /* user will be prompted to pay the asking proces to complete the transaction */
  //   const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
  //   const transaction = await contract.createMarketSale(nft.tokenId, {
  //     value: price
  //   })
  //   await transaction.wait()
  //   loadNFTs()
  // }

  if (loadingState === 'loaded' && !nfts.length) return (
    <h1 className="px-20 py-10 text-3xl text-white">No items in marketplace</h1>
  );
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="flex flex-col items-center justify-center border shadow rounded-xl overflow-hidden">

                <LazyLoadImage class="object-cover h-48 w-96"
                    height={200}
                    src={nft.image}
                    placeholderSrc={"/images/logo.png"}
                    effect="black-and-white"
                    width={400} 
                    // afterLoad={() => console.log("afterLoadText")}
                    // beforeLoad={() => console.log("beforeLoadText")}
                    />
                <div className="flex flex-col items-center w-full">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold text-white text-center">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }} className="bg-red">
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
