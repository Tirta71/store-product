import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "../CSS/navbar.css";

export default function NavbarReusable() {
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();

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

  const showLogoutButton = location.pathname === "/";

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Tirta Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/checkout" active>
              Checkout
            </Nav.Link>
          </Nav>
          {showLogoutButton && (
            <>
              {loggingOut ? (
                <div className="loading-container">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Button className="logout-button" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
