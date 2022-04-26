import Web3 from 'web3'


  export const connectwallet = async () => {
    
    let web3 = null,error = null,acc = null
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        acc = await window.ethereum.request({ method : "eth_requestAccounts"})
       
        web3 = new Web3(window.ethereum)
        return { acc,web3,error }
      }catch(err) {
        error=err.message
        return { acc,web3,error }
      }
    } else {
      console.log("Please install MetaMask")
    }
  }
