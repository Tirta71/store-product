import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import "../login/login.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Password Tidak Cocok");
      return;
    }

    if (!username || !password || !confirmPassword) {
      toast.error("Input tidak boleh kosong");
      return;
    }

    if (!/^[A-Z][A-Za-z0-9]{7,}$/.test(password)) {
      toast.error(
        "Password harus dimulai dengan huruf kapital dan memiliki minimal 8 karakter"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        "https://646f8bf209ff19b120877364.mockapi.io/login/login"
      );

      const users = response.data;

      const isUsernameTaken = users.some((user) => user.username === username);

      if (isUsernameTaken) {
        toast.error("Username sudah digunakan");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
        return;
      }

      const newUser = { username, password, cartItems: [] };

      await axios.post(
        "https://646f8bf209ff19b120877364.mockapi.io/login/login",
        newUser
      );

      navigate("/login");
      setIsLoading(false);

      setTimeout(function () {
        toast.success("Register Berhasil");
      }, 500);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    const isCapsLockActive =
      inputPassword &&
      inputPassword.toLowerCase() !== inputPassword &&
      inputPassword.toUpperCase() === inputPassword;

    setCapsLockActive(isCapsLockActive);
    setPassword(inputPassword);
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
            onChange={handlePasswordChange}
          />
        </div>
        {capsLockActive && (
          <p className="caps-lock-warning">Caps Lock active</p>
        )}
        <div className="control">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
        </div>

        <Button
          className="register-button"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" role="status">
              <span className="sr-only"></span>
            </Spinner>
          ) : (
            "Register"
          )}
        </Button>

        <span>
          Sudah Punya Akun? <a href="/login">Login</a>
        </span>
      </div>
    </div>
  );
};

export default Register;
