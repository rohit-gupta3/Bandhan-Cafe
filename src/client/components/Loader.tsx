import React from "react";
import "./Loader.css";

export const Loader = ():React.JSX.Element => {
  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

