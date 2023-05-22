/* eslint-disable no-undef */
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
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.jumlah,
    0
  );

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCreateOrder = () => {
    if (name === "" || address === "") {
      toast.error("Mohon lengkapi Nama dan Alamat sebelum membuat pesanan.");
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
            widths: ["auto", "*", "*", "*"],
            body: [
              ["No", "Nama Item", "Harga", "Jumlah"],
              ...cartItems.map((item, index) => [
                index + 1,
                item.title,
                `$${item.price}`,
                item.jumlah,
              ]),
              ["", "", "Total Harga", totalPrice],
            ],
          },
        },
        { text: "\n" },
        { text: "Pembayaran", style: "subheader" },
        { text: "\n" },
        {
          table: {
            widths: ["*", "*"],
            body: [
              ["Nama Bank", "BCA"],
              ["Nomor Rekening", "8720649366"],
              ["Nama Rekening", "Tirta Samara"],
              ["Nominal", `Rp. ${totalPrice * 15000}`],
            ],
          },
        },
        { text: "\n" },
        { text: "note : Kirim Bukti pembayaran 081284964533" },
      ],
      styles: {
        header: { fontSize: 18, bold: true, marginBottom: 10 },
        subheader: { fontSize: 14, bold: true, marginBottom: 5 },
      },
    };

    pdfMake.createPdf(docDefinition).download("order.pdf");

    toast.success("Bukti Pesanan telah di Buat");
    setTimeout(() => {
      sessionStorage.removeItem("cartItems");
      localStorage.removeItem("cartItems");
      navigate("/");
    }, 6000);
  };

  return (
    <div className="container">
      <ToastContainer />
      <NavbarReusable />
      <h1>Detail Checkout</h1>
      <div className="container-produk">
        <Table striped>
          <thead>
            <tr>
              <th>Produk Dipesan</th>
              <th>Nama Item</th>
              <th>Harga</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td className="image-table">
                  <img src={item.image} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.jumlah}</td>
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
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Alamat"
          />
        </div>
      </form>
      <Table striped>
        <tbody>
          <tr>
            <td>BCA TIRTA SAMARA : 8720649366</td>
          </tr>
          <tr>
            <td>Nominal : ${totalPrice}</td>
          </tr>
        </tbody>
      </Table>

      <div className="total-price">
        <h2>Total Harga: ${totalPrice}</h2>
        <button onClick={handleCreateOrder}>Buat Pesanan</button>
      </div>
    </div>
  );
}
