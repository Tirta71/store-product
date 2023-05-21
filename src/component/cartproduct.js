import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../CSS/cart.css";
import { Link } from "react-router-dom";
export default function CartDropdown({ cartItems, removeFromCart }) {
  const navigate = useNavigate();

  const handleCheckoutAll = () => {
    console.log("Checkout All");
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <NavDropdown title="Cart" id="navbarScrollingDropdown" className="Test">
      <div className="cart-container">
        {cartItems && cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul>
            {cartItems &&
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
                    <button
                      className="Remove"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
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
