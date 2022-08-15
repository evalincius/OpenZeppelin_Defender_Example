/* pages/create-item.js */
import { useState } from 'react';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import { signMetaTxRequest } from '../../components/signer';
import { createForwarderInstance } from '../../components/forwarder';
import { createMarketplaceInstance } from '../../components/marketplace';
import Modal from "react-modal";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Resizer from "react-image-file-resizer";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const projectId = process.env.IPFS_PROVIDER_PROJECTID;
const projectSecret = process.env.IPFS_PROVIDER_PROJECTSECRET;

const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret, "utf8").toString("base64");
const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization: auth,
    "User-Agent": "foobar"
    }
});

// const client = ipfsHttpClient({
//   url: "https://eds-skillsblock.infura-ipfs.io:5001/api/v0",
//   headers: {
//     authorization: auth,
//   }
// });
export default function CreateItem() {
    const webhookUrl = process.env.REACT_APP_WEBHOOK_URL;

    const [formInput, updateFormInput] = useState({ name: '', description: '' });
    const [file, setFile] = useState(null);
    let [loading, setLoading] = useState(true);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("loading...");

    const resizeFile = (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          877,
          620,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "file"
        );
      });

    function toggleModal(isOpen, message) {
      setIsOpen(isOpen);
      setModalMessage(message);
    }

    async function onChange(e) {
      try {
        const file = e.target.files[0];
        const image = await resizeFile(file);
        console.log(file);
        console.log(image);
        setFile(image);
      } catch (err) {
        console.log(err);
      }
  }


  async function uploadToIPFS() {
    const { name, description } = formInput;
    const gateway = "https://eds-skillsblock.infura-ipfs.io/ipfs/";
    if (!name || !description || !file) return;
    try {
      const addedFileData = await client.add(file);
      /* first, upload to IPFS */
      
      const data = JSON.stringify({
        "title": name,
        "name": name,
        "type": "object",
        "imageUrl": `${gateway}${addedFileData.path}`,
        "description": description
    });
      const addedMetadata = await client.add(data);
      return `${gateway}${addedMetadata.path}`;
      // return "ipfs://QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb";
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

    async function listNFTForSale() {
      toggleModal(true, "Please approve your Free NFT creation.");

      const ipfsUri = await uploadToIPFS();

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      await sendMetaTx(signer, ipfsUri).then(tx => {
        toggleModal(true, "Your NFT has been ordered. Please give it a few moments to appear in your NFT list.");

        setTimeout(function () {    
          toggleModal(false, "");
          router.push({ pathname: "/", query: { toggleModal: true } }); 
        }, 5000);
      })
      .catch(e => {
        console.log(e);
        setTimeout(function () {     
          toggleModal(false, "");
        }, 10000);
        toggleModal(true, "Your NFT order was rejected");
      });
    }

    async function sendMetaTx(signer, url) {
      console.log(`Sending register meta-tx to set url=${url}`);

      if (!webhookUrl) throw new Error(`Missing relayer url`);
    
      const forwarderContract = await createForwarderInstance();
      const marketplaceContract = await createMarketplaceInstance();

      const from = await signer.getAddress();
      const data = marketplaceContract.interface.encodeFunctionData('createToken', [url]);
      const to = marketplaceContract.address;
      
      const request = await signMetaTxRequest(signer.provider, forwarderContract, { to, from, data });
      console.log('got this far');
      return fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    function getModal() {
      return (
        <Modal overlayClassName="Overlay" className="Modal" isOpen={isOpen} ariaHideApp={false} > 
          <div className="flex justify-center items-center min-h-full">
            <div>
              <ClimbingBoxLoader color={'#e83852'} loading={loading} cssOverride={override} size={20} />
              <p className="text-2xl text-white">{modalMessage}</p>
            </div>             
          </div>
        </Modal>
      );
    }

      return (
        <div className="flex justify-center">
          <div className="w-5/6 md:w-1/2">
            <div className="py-2 ">
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                <input type="text" id="small-input" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
            </div>

            <div className="py-2">
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                <input type="text" id="small-input" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => updateFormInput({ ...formInput, description: e.target.value })}/>
            </div>

            <div className="flex justify-center items-center w-full py-2">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={onChange}/>
                </label>
            </div> 

            {
              file && (
                <div className="flex justify-center items-center w-full py-2">
                  <img className="rounded mt-4 py-2" width="300" src={URL.createObjectURL(file)} alt={"Selected image."}/>
                </div>
              )
            }

            <div className="flex justify-center py-2">
              <button onClick={listNFTForSale} className="relative p-0.5 inline-flex items-center justify-center group rounded-full overflow-hidden">
                  <span className="w-full h-full bg-gradient-to-r from-[#df2484] to-[#e83852] absolute"></span>
                  <span className="relative px-6 py-3 bg-gray-900 rounded-full">
                    <span className="absolute top-0 -left-72 w-72 h-12 bg-gradient-to-br from-[#df2484] to-[#e83852] group-hover:translate-x-72  transition-all duration-1000 ease-in-out "></span>
                    <span className="relative text-left text-white font-bald">Mint My Certificate NFT</span>
                  </span>
              </button>
            </div>

            {getModal()}
              
          </div>
        </div>
      );
}