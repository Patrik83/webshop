import React from "react";
import useApi from "../../hooks/useApi";
import List from "../../components/product/List";

const HomePage = () => {
    const { data: products, loaded } = useApi(`http://localhost:3001/api/products/`);

    if (!loaded) {
      return <div>Laddar...</div>;
    }

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