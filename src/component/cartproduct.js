import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../CSS/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartDropdown = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const [stokProduk, setStokProduk] = useState(
    JSON.parse(localStorage.getItem("stokProduk")) || {}
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleCheckoutAll = () => {
    console.log("Checkout All");
    navigate("/checkout", { state: { cartItems } });
  };

  const getTotalItems = () => {
    let totalItems = 0;
    if (cartItems && Array.isArray(cartItems)) {
      cartItems.forEach((item) => {
        totalItems += item.jumlah;
      });
    }
    return totalItems;
  };

  const handleAddToCart = (index) => {
    const updatedCartItems = [...cartItems];
    const addedItem = updatedCartItems[index];

    addedItem.jumlah += 1;

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    setStokProduk(stokProduk - 1);
    localStorage.setItem("stokProduk", JSON.stringify(stokProduk - 1));
  };

  const handleRemove = (index) => {
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

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage) {
        const updatedCartItems =
          JSON.parse(event.newValue) ||
          JSON.parse(localStorage.getItem("cartItems"));
        const updatedStokProduk =
          JSON.parse(event.newValue) ||
          JSON.parse(localStorage.getItem("stokProduk"));
        setCartItems(updatedCartItems);
        setStokProduk(updatedStokProduk);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <NavDropdown
      title={
        <>
          <FontAwesomeIcon icon={faShoppingCart} />
          {`  (${getTotalItems()})`}
        </>
      }
      id="navbarScrollingDropdown"
      className="Test"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="cart-container">
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="cart-dropdown"
          unmountOnExit
        >
          <div>
            {cartItems && cartItems.length > 0 && <h1>Keranjang Belanja</h1>}
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
                          <span className="Harga-Link">
                            <a href={`#${item.id}`}>{item.title}</a>
                            <span className="Harga">
                              ${Math.round(item.price * item.jumlah)}
                            </span>
                          </span>
                        </Link>
                        <div className="buttonDeck">
                          <button
                            className="Remove"
                            onClick={() => handleRemove(index)}
                          >
                            -
                          </button>
                          <span className="text-center">{item.jumlah}</span>
                          <button
                            className="Add"
                            onClick={() => handleAddToCart(index)}
                          >
                            +
                          </button>
                        </div>
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
        </CSSTransition>
      </div>
    </NavDropdown>
  );
};

export default CartDropdown;
