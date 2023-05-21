import React, { useEffect, useState } from "react";
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
            <Link className="ProdukLink" to={`/product/${item.id}`}>
              <div className="Card-Item">
                <img src={item.image} alt={item.title} />
                <div className="Harga-Judul">
                  <span>{item.title}</span>
                  <span className="harga">${item.price}</span>
                </div>
              </div>
            </Link>
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
