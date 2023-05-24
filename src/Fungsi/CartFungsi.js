import { toast } from "react-toastify";

export const addToCart = (product, cartItems, setCartItems) => {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    // If the item already exists, update the quantity
    const updatedCartItems = cartItems.map((item) =>
      item.id === existingItem.id ? { ...item, jumlah: item.jumlah + 1 } : item
    );

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    toast.success("Jumlah Berhasil Di Perbarui");
  } else {
    // If the item doesn't exist, add it to the cart
    const updatedCartItems = [...cartItems, { ...product, jumlah: 1 }];

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    toast.success("test");
  }
};

export const removeFromCart = (item, cartItems, setCartItems) => {
  const updatedCartItems = cartItems.filter(
    (cartItem) => cartItem.id !== item.id
  );

  setCartItems(updatedCartItems);
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  toast.success("Barang telah dihapus");
};
