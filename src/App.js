import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Header from "./components/layout/Header";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";

const App = () => {

  return (
    <BrowserRouter basename="/webshop">
      <Header />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
