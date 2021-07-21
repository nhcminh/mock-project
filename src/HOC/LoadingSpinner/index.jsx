import React from "react";

function LoadingSpinner(props) {
  return (
    <div className="spinner__container">
      <div className="spinner">
        <div className="spinner-item" />
        <div className="spinner-item" />
        <div className="spinner-item" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
