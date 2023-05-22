import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarReusable from "../component/navbarReusable";
import "../CSS/DetailProduk.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [stokProduk, setStokProduk] = useState(
    JSON.parse(localStorage.getItem("stokProduk")) || 200
  );
  const [jumlahProduk, setJumlahProduk] = useState(1);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const goBack = () => {
    navigate("/");
  };

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Item sudah ada dalam keranjang, perbarui jumlah produknya
      const updatedCartItems = cartItems.map((item) =>
        item.id === existingItem.id
          ? { ...item, jumlah: item.jumlah + jumlahProduk }
          : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      navigate({ state: { cartItems: updatedCartItems } });
      toast.success("Jumlah produk diperbarui");
    } else {
      // Item belum ada dalam keranjang, tambahkan item baru
      const newItem = { ...product, jumlah: jumlahProduk };
      const updatedCartItems = [...cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      navigate({ state: { cartItems: updatedCartItems } });
      toast.success("Barang berhasil ditambahkan");
    }

    setStokProduk(stokProduk - jumlahProduk);
    localStorage.setItem(
      "stokProduk",
      JSON.stringify(stokProduk - jumlahProduk)
    );
  };

  const handleIncrement = () => {
    if (jumlahProduk < stokProduk) {
      const newJumlahProduk = jumlahProduk + 1;
      setJumlahProduk(newJumlahProduk);
    }
  };

  const handleDecrement = () => {
    if (jumlahProduk > 1) {
      const newJumlahProduk = jumlahProduk - 1;
      setJumlahProduk(newJumlahProduk);
    }
  };

  return (
    <div className="container">
      <NavbarReusable />
      <div className="detail-product">
        <img src={product.image} alt={product.title} />
        <div className="deskripsi-product">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Sisa Produk: {stokProduk}</p>
          <p>Price: ${product.price}</p>
          <div className="button-produk">
            <button onClick={handleDecrement}>-</button>
            <span>{jumlahProduk}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
          <button className="button-detail" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="button-back">
        <button onClick={goBack}>Kembali</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DetailProduct;
