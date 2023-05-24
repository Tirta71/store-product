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
    }
  };

  const handleDecrement = () => {
    if (jumlahProduk > 1) {
      const newJumlahProduk = jumlahProduk - 1;
      setJumlahProduk(newJumlahProduk);
    }
  };

  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setAddingToCart(true);
    if (stokProduk === 0) {
      toast.error("Barang sudah habis");
      return;
    }

    const addedQuantity = jumlahProduk > stokProduk ? stokProduk : jumlahProduk;

    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === product.id) {
          return { ...cartItem, jumlah: cartItem.jumlah + addedQuantity };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
    } else {
      const newCartItem = { ...product, jumlah: addedQuantity };
      const updatedCartItems = [...cartItems, newCartItem];
      setCartItems(updatedCartItems);
    }

    setJumlahProduk(1);
    setStokProduk((prevStokProduk) => prevStokProduk - addedQuantity); // Update stokProduk

    toast.success("Barang berhasil ditambahkan ke keranjang");
    setTimeout(() => {
      navigate("/checkout");
      setAddingToCart(false);
    }, 2000);
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
          <button
            className="button-detail"
            onClick={handleAddToCart}
            disabled={addingToCart}
          >
            {addingToCart ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Add to Cart"
            )}
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
