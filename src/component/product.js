import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryProduct from "./category";
import "../CSS/category.css";
import CartDropdown from "./cartproduct";

const ProductsComponent = ({ removeFromCart }) => {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isSticky, setIsSticky] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [stokProduk, setStokProduk] = useState(
    () => parseInt(localStorage.getItem("stokProduk")) || 200
  );

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
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

  const handleScroll = () => {
    const searchCartContainer = document.querySelector(".search-cart");
    if (searchCartContainer) {
      const isSticky = window.scrollY > searchCartContainer.offsetTop;
      setIsSticky(isSticky);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
  }

  filteredProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const addToCart = (item) => {
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
    setStokProduk(updatedStokProduk);
    localStorage.setItem("stokProduk", updatedStokProduk.toString());

    toast.success("Barang berhasil ditambahkan ke keranjang");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="atur">
      <CategoryProduct onCategorySelect={handleCategorySelect} />
      <div className={`search-cart container ${isSticky ? "sticky" : ""}`}>
        <ToastContainer />
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Cari produk..."
          className="form-control mb-4"
        />
        <div className="cart-input">
          <CartDropdown addToCart={addToCart} removeFromCart={removeFromCart} />
        </div>
      </div>
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
                <button onClick={() => addToCart(product)}>Add To Cart</button>
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
