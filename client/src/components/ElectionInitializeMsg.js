import React from "react";

const ElectionInitializeMsg = () => {
  const bgstyle = {
    background: "#ffdd99",
  };
  return (
    <div
      className="alert alert-light text-center fw-bold mt-2"
      style={bgstyle}
      role="alert"
    >
      <h3>The election has not been initialized yet !</h3>

      <p>Set up the election.</p>
    </div>
  );
};

export default ElectionInitializeMsg;
