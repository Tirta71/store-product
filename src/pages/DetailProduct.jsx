import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavScrollExample from "../component/navbar";

import "../CSS/DetailProduk.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [stokProduk, setStokProduk] = useState(() => {
    const storedStokProduk = localStorage.getItem("stokProduk");
    return storedStokProduk ? parseInt(storedStokProduk) : 200;
  });
  const [jumlahProduk, setJumlahProduk] = useState(1);

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const goBack = () => {
    navigate("/");
  };

  const handleIncrement = () => {
    if (jumlahProduk < stokProduk) {
      const newJumlahProduk = jumlahProduk + 1;
      setJumlahProduk(newJumlahProduk);
      setStokProduk((prevStokProduk) => prevStokProduk - 1);

      // Update stokProduk in localStorage
      localStorage.setItem("stokProduk", (stokProduk - 1).toString());
    }
  };

  const handleDecrement = () => {
    if (jumlahProduk > 1) {
      const newJumlahProduk = jumlahProduk - 1;
      setJumlahProduk(newJumlahProduk);
      setStokProduk((prevStokProduk) => prevStokProduk + 1);

      // Update stokProduk in localStorage
      localStorage.setItem("stokProduk", (stokProduk + 1).toString());
    }
  };

  const handleAddToCart = () => {
    if (stokProduk === 0) {
      toast.error("Barang sudah habis");
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === product.id
    );
    const addedQuantity = jumlahProduk > stokProduk ? stokProduk : jumlahProduk;

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].jumlah += addedQuantity;
      setCartItems([...cartItems]);
    } else {
      const newCartItem = { ...product, jumlah: addedQuantity };
      setCartItems([...cartItems, newCartItem]);
    }

    setJumlahProduk(1);

    toast.success("Barang berhasil ditambahkan ke keranjang");
  };

  useEffect(() => {
    localStorage.setItem("stokProduk", stokProduk.toString());
  }, [stokProduk]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <NavScrollExample />
      <div className="detail-product">
        <img src={product.image} alt={product.title} />
        <div className="deskripsi-product">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Sisa Produk: {stokProduk}</p>
          <p>Price: ${Math.round(product.price * jumlahProduk)}</p>
          {stokProduk === 0 ? (
            <p>Barang Habis</p>
          ) : (
            <div className="button-produk">
              <button onClick={handleDecrement}>-</button>
              <span>{jumlahProduk}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          )}
          <button className="button-detail" onClick={handleAddToCart}>
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
