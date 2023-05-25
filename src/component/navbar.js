import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import CartDropdown from "./cartproduct";
import "../CSS/navbar.css";

export default function NavScrollExample({
  cartItems,
  removeFromCart,
  addToCart,
}) {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Tirta Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="navbar-collapse">
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
          <div className="cart-dropdown-wrapper">
            <CartDropdown
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
            />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
