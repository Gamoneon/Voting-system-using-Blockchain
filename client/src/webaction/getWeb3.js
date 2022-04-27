import Web3 from 'web3'
import Election from "../contracts/Election.json";

  export const connectwallet = async () => {
    
    let web3 = null,error = null,acc = null
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        acc = await window.ethereum.request({ method : "eth_requestAccounts"})
        web3 = new Web3(window.ethereum)
        //console.log("Connected Add: ", web3.eth.getAccounts());
        return { acc,web3,error }
      }catch(err) {
        error=err.message
        return { acc,web3,error }
      }
    } else {
      console.log("Please install MetaMask")
    }
  }

  export const isAdminAddress = async () => {
    let web3 = null,acc = null, err= null
    const data  = await connectwallet()
    web3 = data.web3
    acc = data.acc
    err = data.err 

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Election.networks[networkId];
    const Electioninstance = new web3.eth.Contract(
      Election.abi,
      deployedNetwork && deployedNetwork.address
    );

  const admin = await Electioninstance.methods.getAdmin().call();
  if(admin.toString().toLowerCase() === acc.toString().toLowerCase()) 
    return true;
  else 
    return false;
  }