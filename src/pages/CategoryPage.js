import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import List from "../components/product/ProductList";
import { getProductsByCategory } from "../services/ProductService";

const CategoryPage = () => {
    let { categoryName } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {

      getProductsByCategory(categoryName)
        .then((data) => {
          setProducts(data)
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }, [categoryName]);

    if (!products) {
      return <div>Inga produkter hittades</div>;
    }

    return (
      <div>
        <List products={products} categoryName={categoryName} />
      </div>
    );
};

export default CategoryPage;