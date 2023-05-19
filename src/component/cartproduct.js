import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const CartProduct = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/carts")
      .then((response) => {
        console.log(response.data);
        setCart(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (cart.length === 0) {
    return <div>Kosong</div>;
  }

  return (
    <div>
      {cart.map((product, index) => (
        <div key={index}>
          <h1>Product ID: {product.productId}</h1>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
};
export default CartProduct;
