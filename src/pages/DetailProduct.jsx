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
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    navigate({ state: { cartItems } });
    toast.success("Barang berhasil ditambahkan");
  };

  return (
    <div className="container">
      <ToastContainer />
      <NavbarReusable />
      <div className="detail-product">
        <img src={product.image} alt={product.title} />
        <div className="deskripsi-product">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button className="button-detail" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="button-back">
        <button onClick={goBack}>Kembali</button>
      </div>
    </div>
  );
};

export default DetailProduct;
