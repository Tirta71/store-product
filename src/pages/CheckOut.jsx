import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarReusable from "../component/navbarReusable";
import "../CSS/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      navigate("/"); // Redirect to home if cartItems is not available
    }
  }, [navigate]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  const removeItem = (itemToRemove) => {
    const updatedCartItems = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const NextCheckout = () => {
    navigate("/detail-checkout");
  };

  return (
    <div className="container">
      <NavbarReusable />
      <h1>Checkout</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <div className="Card-Item">
              <Link className="ProdukLink" to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} />
                <div className="Harga-Judul">
                  <span>{item.title}</span>
                  <span className="harga">${item.price}</span>
                </div>
              </Link>
              <button onClick={() => removeItem(item)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="CheckOut">
        <h3>Total Harga: ${calculateTotalPrice()}</h3>
        <button onClick={() => NextCheckout()}>Checkout</button>
      </div>
    </div>
  );
}
