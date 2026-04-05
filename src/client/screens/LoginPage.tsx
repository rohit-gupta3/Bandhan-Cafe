import React, { useState } from "react";
import "./LoginPage.css";

export const LoginPage = (): React.JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(username === "bandhan" && password === "rohit") {
      window.location.href = "/admin";
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
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="#" className="login-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};