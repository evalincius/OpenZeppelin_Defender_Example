/* pages/create-item.js */
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import { NFTMarketplaceWithMetaTransactions as marketplaceAddress } from '../../deploy.json';

  
import NFTMarketplace from '../../artifacts/contracts/NFTMarketplaceWithMetaTransactions.sol/NFTMarketplaceWithMetaTransactions.json'


export default function CreateItem() {
  const [file, setFile] = useState(null)
  const [formInput, updateFormInput] = useState({ name: '', description: '' })
  const router = useRouter()

    async function onChange(e) {
        setFile(e.target.files[0])    
    }

    async function uploadToIPFS() {
      const { name, description } = formInput
      if (!name || !description || !file) return
     
      try {
        const addedFile = await client.add(file)
        const addedFileUrl = `https://ipfs.infura.io/ipfs/${addedFile.path}`

        /* first, upload to IPFS */
        const data = JSON.stringify({
          name, description, image: addedFileUrl
        })
        const addedMetadata = await client.add(data)
        const addedMetadataUrl = `https://ipfs.infura.io/ipfs/${addedMetadata.path}`
        /* after file is uploaded to IPFS, return the URL to use it in the transaction */
        return addedMetadataUrl
      } catch (error) {
        console.log('Error uploading file: ', error)
      }  
    }

      async function listNFTForSale() {
        const url = await uploadToIPFS()
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
    
        /* next, create the item */
        let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        let transaction = await contract.createToken(url)
        await transaction.wait()
       
        router.push('/')
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
                <img className="rounded mt-4 py-2" width="300" src={URL.createObjectURL(file)} />
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
        </div>
      </div>
      )
}