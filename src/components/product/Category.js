import React from "react";
import List from "./List";

const Category = ({ products, categoryName }) => {
  return (
    <>
      <h1>{categoryName}</h1>
          <List products={products}/>
    </>
  );
};

export default Category;