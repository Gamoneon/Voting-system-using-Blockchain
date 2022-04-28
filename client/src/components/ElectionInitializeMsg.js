import React from "react";

const ElectionInitializeMsg = (props) => {
  //------------------------------ style CSS -----------------------------------------//
  const bgstyle = {
    background: "#ffdd99",
  };

  //------------------------------ useState Hooks -----------------------------------------//

  //------------------------------ Render Content -----------------------------------------//
  return (
    <div
      className="alert alert-light text-center fw-bold mt-2"
      style={bgstyle}
      role="alert"
    >
      <h3>The election has not been initialized yet !</h3>
      {props.isAdmin ? (
        <p>Set up the election.</p>
      ) : (
        <p>Please wait till the admin starts the election</p>
      )}
    </div>
  );
};

export default ElectionInitializeMsg;
