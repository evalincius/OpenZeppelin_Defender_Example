import '../styles/globals.css';
import Link from 'next/link';
import useRouter from "next/router";
import useEffect from 'react';
import HeaderComponent from "./header.js";



function MyApp({ Component, pageProps }) {
  return (<div className="bg-gradient-radial min-h-screen">
             <div className="container">
              <HeaderComponent></HeaderComponent>            

              <Component {...pageProps} />
            </div>
          </div>
  )
}

export default MyApp
