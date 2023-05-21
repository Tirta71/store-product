import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarReusable from "../component/navbarReusable";
import "../CSS/DetailProduk.css";

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
    navigate(-1);
  };

  return (
    <div className="container">
      <NavbarReusable />
      <div className="detail-product">
        <img src={product.image} alt={product.title} />
        <div className="deskripsi-product">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      </div>
      <div className="button-back">
        <button onClick={goBack}>Kembali</button>
      </div>
    </div>
  );
};

export default DetailProduct;
