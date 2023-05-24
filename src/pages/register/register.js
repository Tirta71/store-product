import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login/login.css";
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find((user) => user.username === username);

    if (userExists) {
      setError("Username Sudah ada");
    } else if (password !== confirmPassword) {
      setError("Passwords Tidak Cocok");
    } else {
      const newUser = { username, password, cartItems: [] };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      navigate("/login");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };
  return (
    <div className="login-container">
      <div className="form">
        <h1>Register</h1>
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
          />
        </div>
        <div className="control">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button className="btn" onClick={handleRegister}>
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
        <span>
          Sudah Punya Akun? <a href="/login">Login</a>
        </span>
      </div>
    </div>
  );
};

export default Register;
