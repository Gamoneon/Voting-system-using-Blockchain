import React from "react";

const YourAccount = (props) => {
  return (
    <div className="alert alert-success text-center fw-bold mt-3" role="alert">
      Your Account: {props.account}
    </div>
  );
};

export default YourAccount;
