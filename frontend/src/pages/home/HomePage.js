import React, { useEffect, useState } from "react";
import List from "../../components/product/List";
import { getProducts } from "../../services/ProductService";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Hämta alla produkter när komponenten mountas
    getProducts()
      .then((data) => {
        setProducts(data);  // Sätt produkterna från JSON-filen
        setLoaded(true);    // Ändra tillståndet för att indikera att data har laddats
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoaded(true);  // Ändra tillståndet även vid fel för att sluta ladda
      });
  }, []);

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