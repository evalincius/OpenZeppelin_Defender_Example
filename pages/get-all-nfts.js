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
  const ipfsGatewway = process.env.IPFS_GATEWAY;
  const openseaBaseUrl = process.env.OPENSEA_BASE_URL;

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    
    /* next, create the item */
    console.log(marketplaceAddress);
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);

    const data = await contract.fetchAllNfts();

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      let tokenUrl = tokenUri.replace("ipfs://", ipfsGatewway);
      const meta = await axios.get(tokenUrl);
      let imageUrl = meta.data.imageUrl.replace("ipfs://", ipfsGatewway);

      let item = {
        tokenId: i.tokenId.toNumber(),
        owner: i.owner,
        image: imageUrl,
        name: meta.data.name,
        description: meta.data.description,
        openSeaLink: `${openseaBaseUrl}/${marketplaceAddress}/${i.tokenId}`
      };
      return item;
    }));

    setNfts(items);
    setLoadingState('loaded');
  }

  if (loadingState === 'loaded' && !nfts.length) return (
    <h1 className="px-20 py-10 text-3xl text-white">No items in marketplace</h1>
  );
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              
              <div key={i} className="flex flex-col items-center justify-center border shadow rounded-xl overflow-hidden ">
                <div className="card-zoom">
                  <LazyLoadImage className="card-zoom-image object-cover"
                      height={200}
                      src={nft.image}
                      placeholderSrc={"/images/logo.png"}
                      effect="black-and-white"
                      width={200} 
                      />
                </div>

                <div className="flex flex-col items-center w-full">
                  <p  className="text-2xl font-semibold text-white text-center h-15 pt-2" >{nft.name}</p>
                  <div className="w-full p-2">
                    <p className="text-gray-300">{nft.description}</p>
                    <a href={nft.openSeaLink} target="_blank" rel="noopener noreferrer" className="text-sky-500">OpenSea</a>
                    <div className="w-40">
                      <p className="text-gray-500 truncate">Owner: {nft.owner}</p>
                    </div>

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
