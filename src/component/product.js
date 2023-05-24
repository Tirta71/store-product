import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryProduct from "./category";
import "../CSS/category.css";

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showEffect, setShowEffect] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [stokProduk, setStokProduk] = useState(
    JSON.parse(localStorage.getItem("stokProduk")) || {}
  );

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setShowEffect(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  function handleCategorySelect(category) {
    setSelectedCategory(category);
  }

  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
  }

  filteredProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToCartId, setAddingToCartId] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const addToCart = (item) => {
    setAddingToCart(true);
    setAddingToCartId(item.id);

    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].jumlah += 1;
      setCartItems([...cartItems]);
    } else {
      const newCartItem = { ...item, jumlah: 1 };
      setCartItems([...cartItems, newCartItem]);
    }

    const updatedStokProduk = stokProduk - 1;
    localStorage.setItem("stokProduk", updatedStokProduk.toString());

    toast.success("Barang berhasil ditambahkan ke keranjang");

    setTimeout(() => {
      window.location.href = "/checkout";
      setAddingToCart(false);
      setAddingToCartId(null);
    }, 1000);
  };

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
      <CategoryProduct onCategorySelect={handleCategorySelect} />
      <div className="card-container">
        {filteredProducts.map((product, index) => (
          <div className="container-card" key={index}>
            <Link className="link-produk" to={`/product/${product.id}`}>
              <img src={product.image} alt="" />
            </Link>
            <div className="nama-produk">
              <h1>{product.title}</h1>

              <div className="harga">
                <span>${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="button-add"
                >
                  {addingToCart && addingToCartId === product.id ? (
                    <div className="spinner-border text-light " role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center produk-tidak-ada">Tidak ada produk</p>
      )}
    </div>
  );
};

export default ProductsComponent;
