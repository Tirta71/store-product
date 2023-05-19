import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function ProductsComponent() {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchKeyword}
        onChange={handleSearchChange}
        placeholder="Cari produk..."
        className="form-control mb-4"
      />
      <div className="card-container">
        {filteredProducts.map((product, index) => (
          <div className="container-card" key={index}>
            <img src={product.image} alt="" />
            <div className="nama-produk">
              <h1>{product.title}</h1>
              <div className="card-description">{product.description}</div>
              <div className="harga">
                <span>${product.price}</span>
                <a href={product.title}>BUY</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsComponent;
