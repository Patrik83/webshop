import React, { useEffect, useState } from "react";
import List from "../../components/product/List";
import { getProducts } from "../../services/ProductService";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

    if (!products) {
      return <div>Inga produkter hittades.</div>;
    }

  return (
    <div>
      <List products={products} />
    </div>
  );
};

export default HomePage;