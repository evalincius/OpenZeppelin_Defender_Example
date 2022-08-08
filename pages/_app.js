import '../styles/globals.css';
import HeaderComponent from "./header.js";
import InitWalletComponent from "./init-wallet.js";


function MyApp({ Component, pageProps }) {
  
  return (
    <div className="bg-gradient-radial min-h-screen">
      <div className="container">
        <InitWalletComponent></InitWalletComponent>
        <HeaderComponent></HeaderComponent>            
        <Component {...pageProps} />
      </div>
    </div>
  
  );
}

export default MyApp;
