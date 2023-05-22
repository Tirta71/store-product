import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../CSS/cart.css";
import { toast } from "react-toastify";

export default function CartDropdown({ cartItems, removeFromCart }) {
  const navigate = useNavigate();

  const handleCheckoutAll = () => {
    console.log("Checkout All");
    navigate("/checkout", { state: { cartItems } });
  };

  const getTotalItems = () => {
    let totalItems = 0;
    cartItems.forEach((item) => {
      totalItems += item.jumlah;
    });
    return totalItems;
  };

  const handleRemove = (item) => {
    removeFromCart(item);
    toast.success("Barang berhasil dihapus");
  };

  return (
    <NavDropdown
      title={`Cart (${getTotalItems()})`}
      id="navbarScrollingDropdown"
      className="Test"
    >
      <div className="cart-container">
        {cartItems && cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul>
            {cartItems && Array.isArray(cartItems) ? (
              cartItems.map((item, index) => (
                <li key={index}>
                  <div className="CartProduk">
                    <img src={item.image} alt={item.title} />
                    <Link to={`/product/${item.id}`}>
                      <span>
                        <a href={`#${item.id}`}>{item.title}</a>
                      </span>
                      <span className="Harga">${item.price}</span>
                    </Link>
                    <span className="text-center">Jumlah: {item.jumlah}</span>
                    <button
                      className="Remove"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <p>Invalid cart items</p>
              </li>
            )}
          </ul>
        )}
        {cartItems && cartItems.length > 0 && (
          <button className="CheckoutAll" onClick={handleCheckoutAll}>
            Checkout All
          </button>
        )}
      </div>
    </NavDropdown>
  );
}
