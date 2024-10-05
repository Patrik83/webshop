import React from "react";
import { useParams } from "react-router-dom";
import List from "../../components/product/List";
import useApi from "../../hooks/useApi";

const CategoryPage = () => {
    let { categoryName } = useParams();
    const { data: products, loaded } = useApi(`http://localhost:3001/categories/${categoryName}`);

    if (!loaded) {
      return <div>Laddar...</div>;
    }

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