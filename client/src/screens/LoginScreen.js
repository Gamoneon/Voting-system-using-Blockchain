import React , { useState} from "react";
import Navbar from "../components/Navbar.js";
import Web3 from 'web3'

const LoginScreen = () => {
 
  const [error, setError] = useState('')
  let web3
  const connectwallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        let acc = await window.ethereum.request({ method : "eth_requestAccounts"})
        console.log(acc)
        web3 = new Web3(window.ethereum)
      }catch(err) {
        setError(err.message)
      }
    } else {
      console.log("Please install MetaMask")
    }
  }

  return (
    <>
      <Navbar />
      <h1>LoginScreen</h1>
      <button onClick={connectwallet}>Login</button>
      <section>
        <div className="container text-danger">
          <p><center>{error}</center></p>
        </div>
      </section>
    </>
  );
};

export default LoginScreen;
