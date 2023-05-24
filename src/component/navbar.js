import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Spinner } from "react-bootstrap";
import CartDropdown from "./cartproduct";
import "../CSS/navbar.css";

import { toast } from "react-toastify";

export default function NavScrollExample({
  cartItems,
  removeFromCart,
  addToCart,
}) {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      Object.keys(localStorage).forEach((key) => {
        if (key !== "users" && key !== "stokProduk") {
          localStorage.removeItem(key);
        }
      });
      window.location.href = "/";
      setLoggingOut(false);
      setTimeout(function () {
        toast.success("Berhasil Logout");
      }, 2000);
    }, 2000);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Tirta Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="navbar-colappse">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/" active>
              Home
            </Nav.Link>
            <Nav.Link href="/checkout">Checkout</Nav.Link>
          </Nav>
          <CartDropdown
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
          />
          {loggingOut ? (
            <div className="loading-container">
              <Spinner animation="border" variant="primary" />
              <p>Logging out...</p>
            </div>
          ) : (
            <Button className="logout" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
