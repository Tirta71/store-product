import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import CheckOut from "./pages/CheckOut";
import DetailProduct from "./pages/DetailProduct";
import NotFound from "./pages/NotFound"; // Halaman Not Found
import DetailCheckOut from "./pages/DetailCheckOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/detail-checkout" element={<DetailCheckOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
