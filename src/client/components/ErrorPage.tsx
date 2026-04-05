import React from "react";
import "./ErrorPage.css";

export const ErrorPage = () => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-emoji">😵</div>
        <h1 className="error-title">Oops!</h1>
        <h2 className="error-subtitle">Page Not Found</h2>
        <p className="error-message">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <button
          onClick={handleGoHome}
          className="error-button"
        >
          Go Back Home
        </button>
        <p className="error-footer">
          Or try refreshing the page
        </p>
      </div>
    </div>
  );
};