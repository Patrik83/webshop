import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

// Nyckel för att lagra varukorgens innehåll i localStorage
const LOCAL_STORAGE_KEY = 'cartItems';

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

  // Spara varukorgens innehåll i localStorage varje gång den uppdateras
  useEffect(() => {
    // Konvertera cartItems till en JSON-sträng och spara den i localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems)); // Här konverterar vi cartItems till en sträng.
  }, [cartItems]); // Denna effekt körs varje gång cartItems uppdateras


  const addToCart = (item) => {
    // Uppdatera kvantiteten om produkten redan är tillagd
    const updatedCartItems = cartItems.map((cartItem) => 
      cartItem.id === item.id
        ? { ...cartItem, amount: cartItem.amount + 1 }
        : cartItem
    );
    // Lägg till produkten om den inte redan finns
    if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
      updatedCartItems.push({ ...item, amount: 1 });
    }
    setCartItems(updatedCartItems);
  };
  
  const removeFromCart = (itemId) => {
  const currentItem = cartItems.find((cartItem) => cartItem.id === itemId);

  if (!currentItem) return; // Om produkten inte finns, gör ingenting

  if (currentItem.amount > 1) {
    // Minska kvantiteten om den är högre än 1
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, amount: cartItem.amount - 1 }
          : cartItem
      )
    );
  } else {
    // Ta bort produkten helt om kvantiteten är 1
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
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  };

  // Räkna antalet produkter i varukorgen
  const cartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.amount, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart,
        clearCart, 
        getCartTotal,
        cartItemCount }}
      >
        {children}
    </CartContext.Provider>
  );
};
