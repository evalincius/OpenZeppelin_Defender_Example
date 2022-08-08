import { useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'

const mintNFTPath = "/create-nft/create-item";
const allNFTsPath = "/";

export default function HeaderComponent() {
  
  const router = useRouter()

  return (
   <nav className="md:flex py-8">
     <div className="flex-1 m-auto py-2">
       <div className="flex justify-between w-80 m-auto"> 
         <a href="https://discord.com/" target="_blank"> 
         <img src="/images/soc1.png"></img>
         </a> 
         <a href="https://www.tiktok.com/" target="_blank"> 
           <img src="/images/soc2.png"></img> 
         </a> 
         <a href="https://twitter.com/" target="_blank"> 
           <img  src="/images/soc3.png"></img> 
         </a>
         <a href="https://www.instagram.com/" target="_blank"> 
           <img src="/images/soc4.png"></img> 
         </a> 
         <a href="https://www.youtube.com/" target="_blank"> 
           <img src="/images/soc5.png"></img> 
         </a>
         <a href="https://substack.com/" target="_blank"> 
           <img src="/images/soc6.png"></img> 
         </a> 
         <a href="https://www.spotify.com/" target="_blank"> 
           <img src="/images/soc7.png"></img> 
         </a> 
         <a href="https://web.telegram.org/" target="_blank"> 
           <img src="/images/soc8.png"></img> 
         </a> 
         <a href="https://www.linkedin.com/" target="_blank"> 
           <img src="/images/soc9.png"></img>
         </a> 
       </div>
     </div>

     <div className="flex-1 flex justify-center py-2">    
         <img src="/images/logo.png"></img>     
     </div>
     <div className="flex-1 flex justify-center">
      <div className="flex justify-between m-auto m-auto">
        <div className="px-2">
          <Link href={mintNFTPath}>
            <button className="relative p-0.5 inline-flex items-center justify-center group rounded-full overflow-hidden">
                <span className="w-full h-full bg-gradient-to-r from-[#df2484] to-[#e83852] absolute"></span>
                <span className="relative px-6 py-3 bg-gray-900 rounded-full">
                {
                  router.route == mintNFTPath ?
                    <span className="absolute top-0 left-0 w-72 h-12 bg-gradient-to-br from-[#df2484] to-[#e83852]"></span>:
                    <span className="absolute top-0 -left-72 w-72 h-12 bg-gradient-to-br from-[#df2484] to-[#e83852] group-hover:translate-x-72  transition-all duration-1000 ease-in-out "></span>
                }
                  <span className="relative text-left text-white font-bald">Mint</span>
                </span>
            </button>
          </Link>
         </div>
         <div className="px-2">
           <Link href={allNFTsPath} activeStyle={{fontWeight: "bold"}}>
             <button className="relative p-0.5 inline-flex items-center justify-center group rounded-full overflow-hidden">
              <span className="w-full h-full bg-gradient-to-r from-[#df2484] to-[#e83852] absolute"></span>
              <span className="relative px-6 py-3 bg-gray-900 rounded-full">
                {
                  router.route == allNFTsPath ?
                    <span className="absolute top-0 left-0 w-72 h-12 bg-gradient-to-br from-[#df2484] to-[#e83852]"></span>:
                    <span className="absolute top-0 -left-72 w-72 h-12 bg-gradient-to-br from-[#df2484] to-[#e83852] group-hover:translate-x-72  transition-all duration-1000 ease-in-out "></span>
                }                   
                <span className="relative text-left text-white font-bald">My NFTs</span>
              </span>
             </button>
           </Link>
         </div>
     </div>
     </div>
   </nav>
)
}
