import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    axios
      .get("https://646f8bf209ff19b120877364.mockapi.io/login/login")
      .then((response) => {
        const users = response.data;
        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          localStorage.setItem("isLoggedIn", "true");

          setTimeout(() => {
            setLoading(false);
            toast.success("Berhasil Login");
            setUsername("");
            setPassword("");
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }, 2000); // Delay for 2 seconds
        } else {
          setError("Invalid username or password");
          setTimeout(() => {
            setLoading(false);
          }, 2000); // Delay for 2 seconds
        }
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Delay for 2 seconds
      });
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
        <button className="btn" onClick={handleLogin} disabled={loading}>
          {loading ? <Spinner animation="border" role="status" /> : "Login"}
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
