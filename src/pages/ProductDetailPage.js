import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../components/product/ProductDetail";
import { getProductById } from "../services/ProductService";

const ProductDetailPage = () => {
  let { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {

    getProductById(productId)
      .then((data) => {
        setProduct(data)
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

  }, [productId]); // Kör effekten när productId ändras

  if (!product) {
    return <div>Inga produkter hittades.</div>;
  }

  return (
    <div>
      <Item product={product} />
    </div>
  );
};

export default ProductDetailPage;
