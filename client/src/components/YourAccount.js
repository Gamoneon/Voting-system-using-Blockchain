import React, { useState, useEffect } from "react";
import { sol_getCurrentAccount } from "../webaction/SolidityFunctionModules.js";

const YourAccount = () => {
  //------------------------------ useState Hooks -----------------------------------------//

  const [currentAccount, setCurrentAccount] = useState(null);

  //------------------------------ Functions -----------------------------------------//

  const getCurrentAccount = async () => {
    const data = await sol_getCurrentAccount();
    setCurrentAccount(data);
  };

  useEffect(() => {
    getCurrentAccount();
  },[]);

  //------------------------------ Render Content -----------------------------------------//

  return (
    <div className="alert alert-success text-center fw-bold mt-3" role="alert">
      Your Account: {currentAccount}
    </div>
  );
};

export default YourAccount;
