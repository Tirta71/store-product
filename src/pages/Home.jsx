// Home.js
import React, { useState, useEffect } from "react";
import NavScrollExample from "../component/navbar";
import ProductsComponent from "../component/product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (item) => {
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(itemIndex, 1);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      toast.success("Barang Telah Di hapus");
    }
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <div className="container mt-4">
      <NavScrollExample cartItems={cartItems} removeFromCart={removeFromCart} />
      <h1 className="text-center">Daftar Produk</h1>
      <div className="card-container">
        <ProductsComponent addToCart={addToCart} />
      </div>
    </div>
  );
}
