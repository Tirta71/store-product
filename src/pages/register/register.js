import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "../login/login.css";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    if (!username || !password || !confirmPassword) {
      toast.error("input tidak boleh kosong");
      return;
    }

    if (!/^[A-Z][A-Za-z0-9]{7,}$/.test(password)) {
      toast.error("Password Harus Kapital dan 8 Huruf");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find((user) => user.username === username);

    if (userExists) {
      setError("Username already exists");
    } else {
      setIsLoading(true);

      setTimeout(() => {
        const newUser = { username, password, cartItems: [] };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
        navigate("/login");
        setIsLoading(false);

        setTimeout(function () {
          toast.success("Register Berhasil");
        }, 1000);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
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
        <button
          className="register-button"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
            </>
          ) : (
            "Register"
          )}
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
