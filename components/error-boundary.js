import React from 'react';
import Modal from "react-modal";
import HeaderComponent from "../pages/header.js";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, errorMsg: "" };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, errorMsg: error.message };
    }
  
    componentDidCatch(error){
        this.setState({hasError:true, errorMsg: error.message });
    }
  
    render() {
      if (this.state.hasError) {
        const errorMsg = this.state.errorMsg;
        // You can render any custom fallback UI
        return (
                <div >
                    <div className="bg-gradient-radial min-h-screen w-full">
                        <div className="container">
                            <HeaderComponent></HeaderComponent>            
                        </div>        
                    </div>
                    <Modal
                        isOpen={true}
                        className="{}"
                        ariaHideApp={false}
                        contentLabel="My dialog">
                            <div className="flex justify-center items-center min-h-screen">
                                <div className="flex flex-col items-center w-full">
                                    <p className="text-2xl text-black text-center">Something went wrong. </p>
                                    <p className="text-xl text-black text-center">{errorMsg}</p>
                                </div>
                            </div>
                    </Modal>
                </div>         

        );
      }
      return this.props.children; 
    }
  }