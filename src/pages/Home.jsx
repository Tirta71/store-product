import React, { useState, useEffect } from "react";

import ProductsComponent from "../component/product";
import "../CSS/home.css";
import NavbarReusable from "../component/navbarReusable";

const Home = ({ addToCart, removeFromCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);

    setTimeout(() => {
      setShowContent(true);
    }, 500);
  }, []);

  return (
    <div
      className={`up-transisi container mt-4 ${
        showContent ? "show-content" : " "
      } `}
    >
      <NavbarReusable />
      <h1 className="text-center mt-5">Daftar Produk</h1>
      <div className="card-container">
        <ProductsComponent addToCart={addToCart} />
      </div>
    </div>
  );
};

export default Home;
