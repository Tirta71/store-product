import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductsComponent({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleAddToCart = (product) => {
    toast.success("Barang Berhasil Ditambahkan");
    addToCart(product);
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  let isProductFound = false;

  return (
    <div className="atur">
      <ToastContainer />
      <input
        type="text"
        value={searchKeyword}
        onChange={handleSearchChange}
        placeholder="Cari produk..."
        className="form-control mb-4"
      />

      <div className="card-container">
        {filteredProducts.map((product, index) => {
          if (searchKeyword !== product.title) {
            isProductFound = true;
            return (
              <div className="container-card" key={index}>
                <Link className="link-produk" to={`/product/${product.id}`}>
                  <img src={product.image} alt="" />
                </Link>
                <div className="nama-produk">
                  <h1>{product.title}</h1>

                  <div className="harga">
                    <span>${product.price}</span>
                    <button onClick={() => handleAddToCart(product)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {!isProductFound && (
        <p className="text-center produk-tidak-ada">Tidak ada produk</p>
      )}
    </div>
  );
}

export default ProductsComponent;
