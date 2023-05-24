import React, { useState, useEffect } from "react";
import NavScrollExample from "../component/navbar";
import ProductsComponent from "../component/product";

const Home = ({ addToCart, removeFromCart }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <div className="container mt-4">
      <NavScrollExample cartItems={cartItems} removeFromCart={removeFromCart} />
      <h1 className="text-center mt-5">Daftar Produk</h1>
      <div className="card-container">
        <ProductsComponent addToCart={addToCart} />
      </div>
    </div>
  );
};

export default Home;
