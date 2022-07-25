/* pages/create-item.js */
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
    marketplaceAddress
} from '../config'
  
import NFTMarketplace from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'


export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter()

    async function onChange(e) {
        const file = e.target.files[0]

        try {
            const added = await client.add(
                file,
                {
                progress: (prog) => console.log(`received: ${prog}`)
                }
        )
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setFileUrl(url)
        } catch (error) {
        console.log('Error uploading file: ', error)
        }  
    }

    async function uploadToIPFS() {
        const { name, description, price } = formInput
        if (!name || !description || !price || !fileUrl) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
          name, description, image: fileUrl
        })
        try {
          const added = await client.add(data)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          /* after file is uploaded to IPFS, return the URL to use it in the transaction */
          return url
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }

      async function listNFTForSale() {
        const url = await uploadToIPFS()

        // const credentials = { apiKey: "9qYN4Znuin9eTNk62uYmN6nhc6hr6eXQ", apiSecret: "4iXG5yj9o2ZQicRHKA2ZF2yZgSB2HfAPwFcqJNnm14Jsx2LqrRsHod8Et3iUryTt" };
        // const provider = new DefenderRelayProvider(credentials);
        // const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });


        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
    
        /* next, create the item */
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        let transaction = await contract.createToken(url, price, { value: listingPrice })
        await transaction.wait()
       
        router.push('/')
      }

      

      return (
        <div className="flex justify-center">
          <div className="w-5/6 md:w-1/2">
            <div class="py-2 ">
                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                <input type="text" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
            </div>

            <div class="py-2">
                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                <input type="text" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => updateFormInput({ ...formInput, description: e.target.value })}/>
            </div>

            <div class="py-2">
                <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Value</label>
                <input type="text" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => updateFormInput({ ...formInput, price: e.target.value })}/>
            </div>

            <div class="flex justify-center items-center w-full py-2">
                <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" onChange={onChange}/>
                </label>
            </div> 


            {
              fileUrl && (
                <img className="rounded mt-4" width="350" src={fileUrl} />
              )
            }

            <div class="flex justify-center py-">
              <button onClick={listNFTForSale} class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full">
                  <span class="w-full h-full bg-gradient-to-r from-[#df2484] to-[#e83852] absolute"></span>
                  <span class="relative px-6 py-3 bg-gray-900 rounded-full">
                    <span class="absolute left-0 top-0 bg-gradient-to-r from-[#df2484] to-[#e83852] opacity-[3%]"></span>
                    <span class="absolute top-0 left-0 w-72 h-48 transition-all duration-1000 ease-in-out -translate-x-72 -translate-y-24 bg-gradient-to-br from-[#df2484] to-[#e83852] opacity-100 group-hover:-translate-x-8 "></span>
                    <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out">Mint My Certificate NFT</span>
                  </span>
              </button>
            </div>
          </div>
        </div>
      )
}