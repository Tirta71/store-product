// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     const existingItem = cartItems.find((item) => item.id === product.id);

//     if (existingItem) {
//       const updatedCartItems = cartItems.map((item) =>
//         item.id === product.id ? { ...item, jumlah: item.jumlah + 1 } : item
//       );
//       setCartItems(updatedCartItems);
//     } else {
//       setCartItems([...cartItems, { ...product, jumlah: 1 }]);
//     }
//   };

//   const removeFromCart = (item) => {
//     const updatedCartItems = cartItems.filter(
//       (cartItem) => cartItem.id !== item.id
//     );
//     setCartItems(updatedCartItems);
//   };

//   useEffect(() => {
//     const storedCartItems =
//       JSON.parse(sessionStorage.getItem("cartItems")) || [];
//     setCartItems(storedCartItems);
//   }, []);

//   useEffect(() => {
//     sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
