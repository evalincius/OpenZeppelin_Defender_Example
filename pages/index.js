import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from "web3modal";
import { LazyLoadImage } from 'react-lazy-load-image-component';


import { NFTMarketplaceWithMetaTransactions as marketplaceAddress } from '../deploy.json';


import NFTMarketplace from '../artifacts/contracts/NFTMarketplaceWithMetaTransactions.sol/NFTMarketplaceWithMetaTransactions.json';

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');

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

    const data = await contract.fetchMyNFTs();

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
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                {/* <img src={nft.image} /> */}
                <LazyLoadImage
                  height={200}
                  src={nft.image}
                  placeholderSrc={"/images/logo.png"}
                  effect="black-and-white"
                  width={300} 
                  // afterLoad={() => console.log("afterLoadText")}
                  // beforeLoad={() => console.log("beforeLoadText")}
                  />
                <div className="p-4 flex flex-col items-center">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold text-white ">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                {/* <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">{nft.owner}</p>
                  <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div> */}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
