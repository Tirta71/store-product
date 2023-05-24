import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import CartDropdown from "./cartproduct";
import "../CSS/navbar.css";

import { toast } from "react-toastify";

export default function NavScrollExample({
  cartItems,
  removeFromCart,
  addToCart,
}) {
  const handleLogout = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key !== "users") {
        localStorage.removeItem(key);
      }
    });

    // Setelah menghapus data dari localStorage, arahkan pengguna ke halaman login
    window.location.href = "/";

    toast.success("Berhasil Logout");
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
          <Button className="logout" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
