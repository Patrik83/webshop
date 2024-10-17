import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// Nyckel för att lagra varukorgens innehåll i localStorage
const LOCAL_STORAGE_KEY = "cartItems";

// Funktion för att hämta sparade varor från localStorage
const getSavedCartItems = () => {
  // Försök att hämta varorna från localStorage
  const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
  // Om det finns tillagda produkter, konvertera dem från JSON-sträng till objekt
  if (savedItems) {
    return JSON.parse(savedItems);
  }

  // Om inga sparade varor finns, returnera en tom array
  return [];
};

export const CartProvider = ({ children }) => {
  // State för att lagra varukorgens innehåll
  const [cartItems, setCartItems] = useState(getSavedCartItems);

  // Sparar varukorgens innehåll i localStorage varje gång den uppdateras
  useEffect(() => {
    // Konvertera cartItems till en JSON-sträng och spara den i localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (item, newQuantity) => {
    // Uppdatera varukorgen med den nya kvantiteten
    setCartItems(prevCartItems => 
      prevCartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, amount: newQuantity } // Sätt den nya kvantiteten direkt
          : cartItem
      )
    );
  };
  
  const addToCart = (item, quantity = 1) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, amount: cartItem.amount + quantity }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, amount: quantity }]);
    }
  };

  const removeFromCart = (item) => {
    const itemId = item.id;

    // Kolla om produkten redan finns i varukorgen
    const currentItem = cartItems.find((cartItem) => cartItem.id === itemId);

    if (!currentItem) return; // Om produkten inte finns, gör ingenting

    if (currentItem.amount > 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
    }
  };

  // Töm hela varukorgen
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Rensa localStorage
  };

  // Beräkna totalpriset för produkterna
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  };

  // Räkna antalet produkter i varukorgen
  const cartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.amount, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleQuantityChange,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
