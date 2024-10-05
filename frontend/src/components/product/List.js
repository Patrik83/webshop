import React from "react";
import { Link } from "react-router-dom";
import style from "../../styles/ProductList.module.css";
import Card from "./Card";
import Image from "./Image";
import Details from "./Details";

const List = ({ products, categoryName }) => {
  return (
    <main className={style.container}>
      <h1 className={style.categoryText}>
        {categoryName}
      </h1>
      <div className={style.productCard}>
      {products.map((product) => (
        <Card key={product.id}>
          <Link to={`/product/${product.id}`}>
            <Image
              imageUrl={product.Images[0].imageUrl}
              altText={`Bild på ${product.name}`}
            />
            <div>
              <Details product={product} />
            </div>
          </Link>
        </Card>
      ))}
      </div>
    </main>
  );
};

export default List;