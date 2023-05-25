import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

import ProductsComponent from "../component/product";
import "../CSS/home.css";
import NavbarReusable from "../component/navbarReusable";

const Home = ({ addToCart, removeFromCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);

    let timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleLogout();
      }, 60000);
    };

    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keydown", resetTimeout);
    document.addEventListener("click", resetTimeout);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keydown", resetTimeout);
      document.removeEventListener("click", resetTimeout);
    };
  }, []);

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      Object.keys(localStorage).forEach((key) => {
        if (key !== "users" && key !== "stokProduk") {
          localStorage.removeItem(key);
        }
      });
      setLoggingOut(false);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  }, []);

  return (
    <div className="container mt-4">
      <NavbarReusable />
      <h1 className={`text-center mt-5 ${showContent ? "show-title" : ""}`}>
        Daftar Produk
      </h1>
      <div className={`card-container ${showContent ? "show-content" : ""}`}>
        <ProductsComponent addToCart={addToCart} />
      </div>
    </div>
  );
};

export default Home;
