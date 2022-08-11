import '../styles/globals.css';
import HeaderComponent from "./header.js";
import InitWalletComponent from "./init-wallet.js";
import ErrorBoundary from "../components/error-boundary.js";


function MyApp({ Component, pageProps }) {
  
  return (
    <ErrorBoundary>
      <div className="bg-gradient-radial min-h-screen">
        <div className="container">
          <InitWalletComponent></InitWalletComponent>
          <HeaderComponent></HeaderComponent>            
          <Component {...pageProps} />
        </div>
      </div>
    </ErrorBoundary>

    
  
  );
}

export default MyApp;
