import React, { useState, useEffect } from "react";
import { sol_isAdminAddress } from "../webaction/SolidityFunctionModules.js";

const ElectionInitializeMsg = () => {
  //------------------------------ style CSS -----------------------------------------//
  const bgstyle = {
    background: "#ffdd99",
  };

  //------------------------------ useState Hooks -----------------------------------------//
  const [isAdminConnected, setIsAdminConnected] = useState(false);

  //------------------------------ Functions -----------------------------------------//
  const isAdmin = async () => {
    const data = await sol_isAdminAddress();
    setIsAdminConnected(data);
  };

  useEffect(() => {
    isAdmin();
    // console.log(isAdminConnected);
  });
  //------------------------------ Render Content -----------------------------------------//
  return (
    <div
      className="alert alert-light text-center fw-bold mt-2"
      style={bgstyle}
      role="alert"
    >
      <h3>The election has not been initialized yet !</h3>
      {isAdminConnected ? (
        <p>Set up the election.</p>
      ) : (
        <p>Please wait till the admin starts the election</p>
      )}
    </div>
  );
};

export default ElectionInitializeMsg;
