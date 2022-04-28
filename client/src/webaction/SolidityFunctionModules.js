import Web3 from 'web3'
import Election from "../contracts/Election.json";

export const connectwallet = async () => {

  let web3 = null, error = null, acc = null
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      acc = await window.ethereum.request({ method: "eth_requestAccounts" })
      web3 = new Web3(window.ethereum)
      //console.log("Connected Add: ", web3.eth.getAccounts());
      return { acc, web3, error }
    } catch (err) {
      error = err.message
      return { acc, web3, error }
    }
  } else {
    console.log("Please install MetaMask")
  }
}

export const getElectionInstance = async () => {
  let web3 = null, err = null
  const data = await connectwallet()
  web3 = data.web3
  err = data.err

  // Get the contract instance.
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Election.networks[networkId];
  const ElectionInstance = new web3.eth.Contract(
    Election.abi,
    deployedNetwork && deployedNetwork.address
  );
  return ElectionInstance;
}

//Get current accout
export const getCurrentAccount = async () => {
  const data = await connectwallet();
  return data.acc[0];
}

export const isAdminAddress = async () => {

  const data = await connectwallet()
  let acc = data.acc

  const ElectionInstance = await getElectionInstance()
  const admin = await ElectionInstance.methods.getAdmin().call();
  if (admin.toString().toLowerCase() === acc.toString().toLowerCase())
    return true;
  else
    return false;
}

export const startElection = async () => {
  const ElectionInstance = await getElectionInstance()
  let start = await ElectionInstance.methods.getStart().call()
  console.log("Start status before election start: ", start);
  if (await isAdminAddress() && !start) {
    const electionStatus = await ElectionInstance.methods.startElection().send({ from: await getCurrentAccount(), gas: 1000000 });
    console.log("Election started: ",electionStatus);

    const start = await ElectionInstance.methods.getStart().call()
    console.log("Election Name:", await ElectionInstance.methods.getElectionName().call());
    console.log("Start is set to: ", start);

    return true;
  }

  else {
    console.log("Election start - failed!");
    return false;
  }

}