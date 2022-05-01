import Web3 from "web3";
import Election from "../contracts/Election.json";

export const sol_connectwallet = async () => {
  let web3 = null,
    error = null,
    acc = null;
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      acc = await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      return { acc, web3, error };
    } catch (err) {
      error = err.message;
      return { acc, web3, error };
    }
  } else {
    console.log("Please install MetaMask");
  }
};

export const sol_getElectionInstance = async () => {
  let web3 = null;

  const data = await sol_connectwallet();
  web3 = data.web3;

  // Get the contract instance.
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Election.networks[networkId];
  const ElectionInstance = new web3.eth.Contract(
    Election.abi,
    deployedNetwork && deployedNetwork.address
  );
  return ElectionInstance;
};

//Get current accout
export const sol_getCurrentAccount = async () => {
  const data = await sol_connectwallet();
  if (data.error) {
    return false;
  } else {
    return data.acc[0];
  }
};

export const sol_isAdminAddress = async () => {
  let acc = await sol_getCurrentAccount();
  if (acc) {
    const ElectionInstance = await sol_getElectionInstance();
    const admin = await ElectionInstance.methods.getAdmin().call();

    if (admin.toString().toLowerCase() === acc.toString().toLowerCase()) {
      return true;
    }
  }
  return false;
};

// export const sol_startElection = async () => {
//   const ElectionInstance = await sol_getElectionInstance();
//   let start = await ElectionInstance.methods.getStart().call();
//   console.log("Start status before election start: ", start);
//   if ((await sol_isAdminAddress()) && !start) {
//     const electionStatus = await ElectionInstance.methods
//       .startElection()
//       .send({ from: await sol_getCurrentAccount(), gas: 1000000 });
//     console.log("Election started: ", electionStatus);

//     const start = await ElectionInstance.methods.getStart().call();
//     console.log(
//       "Election Name:",
//       await ElectionInstance.methods.getElectionName().call()
//     );
//     console.log("Start is set to: ", start);

//     return true;
//   } else {
//     console.log("Election start - failed!");
//     return false;
//   }
// };

export const sol_startElection = async (electionTitle, organizationName) => {
  const ElectionInstance = await sol_getElectionInstance();
  let data = await ElectionInstance.methods.getElectionDetails().call();
  const isElectionStarted = data[0];
  console.log("Start status before election start: ", isElectionStarted);
  if (!isElectionStarted) {
    await ElectionInstance.methods
      .startElection(electionTitle, organizationName)
      .send({ from: await sol_getCurrentAccount(), gas: 1000000 });

    let newdata = await ElectionInstance.methods.getElectionDetails().call();
    console.log("Election Details: ", newdata);
    return newdata;
  } else {
    console.log("Election start - failed!");
    return false;
  }
};

//Add login details
export const sol_addLoginDetails = async (username, email, password) => {
  const acc = await sol_getCurrentAccount();
  if (acc) {
    const ElectionInstance = await sol_getElectionInstance();
    if (!(await ElectionInstance.methods.isVoterExists(acc).call())) {
      await ElectionInstance.methods
        .addVoterDetails(username, email, password)
        .send({ from: acc, gas: 1000000 });
      return true;
    }
  }
  return false;
};

//Verify login details
export const sol_verifyLoginDetails = async (email, password) => {
  const acc = await sol_getCurrentAccount();
  if (acc) {
    const ElectionInstance = await sol_getElectionInstance();

    const loginData = await ElectionInstance.methods
      .getLoginDetails(acc)
      .call();

    const storedEmail = loginData[0];
    const storedPassowrd = loginData[1];
    const storedAccount = loginData[2];
    if (
      storedEmail === email &&
      storedPassowrd === password &&
      acc.toString().toLowerCase() === storedAccount.toString().toLowerCase()
    )
      return true;
  }
  return false;
};

// Get account details by address
export const sol_getUserDetails = async () => {
  const acc = await sol_getCurrentAccount();
  if (acc) {
    const ElectionInstance = await sol_getElectionInstance();

    const loginData = await ElectionInstance.methods
      .getLoginDetails(acc)
      .call();
    return loginData;
  }
  return false;
};
