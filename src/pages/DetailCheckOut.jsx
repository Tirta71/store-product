import React, { useState } from "react";
import NavbarReusable from "../component/navbarReusable";
import { Table } from "react-bootstrap";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "../CSS/detailCheckout.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function DetailCheckout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCreateOrder = () => {
    if (name === "" || address === "") {
      toast.success("Mohon lengkapi Nama dan Alamat sebelum membuat pesanan.");
      return;
    }

    const docDefinition = {
      content: [
        { text: "Detail Pesanan", style: "header" },
        { text: "\n" },
        { text: `Nama: ${name}`, style: "subheader" },
        { text: `Alamat: ${address}`, style: "subheader" },
        { text: "\n" },
        { text: "Produk Dipesan", style: "subheader" },
        { text: "\n" },
        {
          table: {
            widths: ["*", "*", "*"],
            body: [
              ["No", "Nama Item", "Harga"],
              ...cartItems.map((item, index) => [
                index + 1,
                item.title,
                `$${item.price}`,
              ]),
              ["", "Total Harga:", `$${totalPrice}`],
            ],
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, marginBottom: 10 },
        subheader: { fontSize: 14, bold: true, marginBottom: 5 },
      },
    };

    pdfMake.createPdf(docDefinition).download("order.pdf");

    setTimeout(() => {
      sessionStorage.removeItem("cartItems");
      localStorage.removeItem("cartItems");
      navigate("/");
    }, 5000);
  };

  return (
    <div className="container">
      <ToastContainer />
      <NavbarReusable />
      <h1>Detail Checkout</h1>
      <div className="container-produk">
        <Table striped>
          <thead>
            <th>Produk Dipesan</th>
            <th>Nama Item</th>
            <th>Harga</th>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td className="image-table">
                  <img src={item.image} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <form>
        <div className="input-nama">
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Nama"
          />
        </div>
        <div className="input-alamat">
          <label htmlFor="address"></label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Alamat"
          />
        </div>
      </form>
      <div className="total-price">
        <h2>Total Harga: ${totalPrice}</h2>
        <button onClick={handleCreateOrder}>Buat Pesanan</button>
      </div>
    </div>
  );
}
