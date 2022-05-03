import React from "react";

const AlertMessage = (props) => {
  return (
    <div
      className={`alert alert-${props.type} alert-dismissible fade show`}
      role="alert"
    >
      {props.message}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        style={{ display: "hidden" }}
        onClick={setTimeout(function () {
          window.location.reload(false);
        }, 3000)}
      ></button>
    </div>
  );
};

export default AlertMessage;
