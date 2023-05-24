import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarReusable from "../component/navbarReusable";
import "../CSS/checkout.css";
import { toast, ToastContainer } from "react-toastify";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [stokProduk, setStokProduk] = useState(
    JSON.parse(localStorage.getItem("stokProduk")) || 10
  );
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.jumlah;
    });
    return totalPrice;
  };

  const addToCart = (index) => {
    const updatedCartItems = [...cartItems];
    const addedItem = updatedCartItems[index];

    addedItem.jumlah += 1;

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    setStokProduk(stokProduk - 1);
    localStorage.setItem("stokProduk", JSON.stringify(stokProduk - 1));
  };

  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    const removedItem = updatedCartItems[index];

    if (removedItem.jumlah > 1) {
      removedItem.jumlah -= 1;
    } else {
      updatedCartItems.splice(index, 1);
    }

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    setStokProduk(stokProduk + 1);
    localStorage.setItem("stokProduk", JSON.stringify(stokProduk + 1));
  };

  const NextCheckout = () => {
    navigate("/detail-checkout");
  };

  return (
    <div className="container">
      <ToastContainer />
      <NavbarReusable />
      <h1>Checkout</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="Card-Item">
                <Link className="ProdukLink" to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                  <div className="Harga-Judul">
                    <span>{item.title}</span>
                    <span className="harga">${item.price}</span>
                    <span>Jumlah: {item.jumlah}</span>
                  </div>
                </Link>
                <div className="pemisah-button">
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                  <button onClick={() => addToCart(index)}>Add</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Tidak ada barang yang ditambahkan.</p>
      )}
      {cartItems.length > 0 && (
        <div className="CheckOut">
          <h3>Total Harga: ${Math.round(calculateTotalPrice())}</h3>
          <button onClick={NextCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}
