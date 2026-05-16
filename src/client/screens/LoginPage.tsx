import React, { useState } from "react";
import "./LoginPage.css";

export const LoginPage = (): React.JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        window.location.href = "/admin";
      } else {
        setErrorMessage(
          data.message || "Invalid username or password. Please try again.",
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        "We are facing some technical issues. Please contact owner",
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">🍺</div>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to Bandhan Cafe</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            className="login-input"
            required
          />
          {errorMessage && <div className="login-error">{errorMessage}</div>}
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <a href="#" className="login-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
