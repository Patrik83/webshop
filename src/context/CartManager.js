import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'cartItems';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const itemExistsInCart = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemExistsInCart) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, amount: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const currentItem = prevItems.find((cartItem) => cartItem.id === itemId);
      if (!currentItem) {
        return prevItems;
      }
      if (currentItem.amount > 1) {
        return prevItems.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, amount: cartItem.amount - 1 } : cartItem
        );
      }
      return prevItems.filter((cartItem) => cartItem.id !== itemId);
    });
  };

  const clearCart = () => {
    localStorage.clear();
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  };

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
