import '../styles/globals.css'
import Link from 'next/link'


function MyApp({ Component, pageProps }) {
  return (<div class="bg-gradient-radial h-screen">
             <div class="container">
              <nav className="md:flex py-8">

                <div class="flex-1 m-auto py-2">
                  <div class="flex justify-between w-80 m-auto"> 
                    <a href="https://discord.com/" target="_blank"> 
                    <img src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/soc1.png"></img>
                      {/* <span>Discord</span> */}
                    </a> 
                    <a href="https://www.tiktok.com/" target="_blank"> 
                      <img src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/soc2.png"></img> 
                      {/* <span>TikTok</span>  */}
                    </a> 
                    <a href="https://twitter.com/" target="_blank"> 
                      <img  src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/soc3.png"></img> 
                      {/* <span>Twitter</span>  */}
                    </a>
                    <a href="https://www.instagram.com/" target="_blank"> 
                      <img src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/Vector-5.png"></img> 
                      {/* <span>Instagram</span>  */}
                    </a> 
                    <a href="https://www.youtube.com/" target="_blank"> 
                      <img src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/Vector-6.png"></img> 
                      {/* <span>YouTube</span>  */}
                    </a>
                    <a href="https://substack.com/" target="_blank"> 
                      <img src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/Vector-7.png"></img> 
                      {/* <span>Substack</span>  */}
                    </a> 
                    <a href="https://www.spotify.com/" target="_blank"> 
                      <img src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/Vector-8.png"></img> 
                      {/* <span>Spotify</span>  */}
                    </a> 
                    <a href="https://web.telegram.org/" target="_blank"> 
                      <img src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/Vector-9.png"></img> 
                      {/* <span>Telegram</span> */}
                    </a> 
                    <a href="https://www.linkedin.com/" target="_blank"> 
                      <img src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/Vector-10.png"></img>
                      {/* <span>LinkedIn</span>  */}
                    </a> 
                  </div>
                </div>

                <div class="flex-1 flex justify-center py-2">
                  
                    <img src="https://www.skillsblock.mtcserver.com/wp-content/uploads/2022/07/logo.png"></img>
                  
                </div>
               
                
                <div class="flex-1 flex justify-center">

                <div class="flex justify-between m-auto m-auto">
                    {/* <Link href="/">
                      <a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full">
                          <span class="w-full h-full bg-gradient-to-r from-[#df2484] to-[#e83852] absolute"></span>
                          <span class="relative px-6 py-3 bg-gray-900 rounded-full">
                            <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-gradient-to-r from-[#df2484] to-[#e83852] opacity-[3%]"></span>
                            <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out  -translate-x-56 -translate-y-24 bg-gradient-to-br from-[#df2484] to-[#e83852] opacity-100 group-hover:-translate-x-8 "></span>
                            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Home</span>
                          </span>
                      </a>
                    </Link> */}
                    <div class="px-2">
                      <Link href="/create-item">
                        <a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full">
                            <span class="w-full h-full bg-gradient-to-r from-[#df2484] to-[#e83852] absolute"></span>
                            <span class="relative px-6 py-3 bg-gray-900 rounded-full">
                              <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-gradient-to-r from-[#df2484] to-[#e83852] opacity-[3%] "></span>
                              <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-1000 ease-in-out  -translate-x-56 -translate-y-24 bg-gradient-to-br from-[#df2484] to-[#e83852] opacity-100 group-hover:-translate-x-8"></span>
                              <span class="relative w-full text-left text-white transition-colors duration-800 ease-in-out">Mint</span>
                            </span>
                        </a>
                      </Link>
                    </div>
                    <div class="px-2">
                      <Link href="/my-assets" >
                        <a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full">
                            <span class="w-full h-full bg-gradient-to-r from-[#df2484] to-[#e83852] absolute"></span>
                            <span class="relative px-6 py-3 bg-gray-900 rounded-full">
                              <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-gradient-to-r from-[#df2484] to-[#e83852] opacity-[3%]"></span>
                              <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out  -translate-x-56 -translate-y-24 bg-gradient-to-br from-[#df2484] to-[#e83852] opacity-100 group-hover:-translate-x-8 "></span>
                              <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out">My NFTs</span>
                            </span>
                        </a>
                      </Link>
                    </div>
                    
                    
                    {/* <Link href="/creator-dashboard">
                      <a href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full">
                          <span class="w-full h-full bg-gradient-to-r from-[#df2484] to-[#e83852] absolute"></span>
                          <span class="relative px-6 py-3 bg-gray-900 rounded-full">
                            <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-gradient-to-r from-[#df2484] to-[#e83852] opacity-[3%]"></span>
                            <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out  -translate-x-56 -translate-y-24 bg-gradient-to-br from-[#df2484] to-[#e83852] opacity-100 group-hover:-translate-x-8 "></span>
                            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Creator Dashboard</span>
                          </span>
                      </a>
                    </Link>      */}
                </div>
                  
                </div>
              </nav>

              <Component {...pageProps} />
            </div>
          </div>
  )
}

export default MyApp
