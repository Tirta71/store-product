import React, { useState } from "react";

import "./login.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      window.location.href = "/";
      toast.success("Berhasil Login");
    } else {
      setError("Invalid username or password");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="form">
        <h1>Login</h1>
        <div className="control">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="control">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
        <span>
          Tidak Punya Akun? <a href="/register">Register</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
