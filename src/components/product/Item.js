import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartManager";
import style from "../../styles/ProductItem.module.css";
import Image from "./Image";
import Details from "./Details";

const Item = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <main className={style.productWrapper}>
      {/* Stor produktbild */}
      <div className={style.pictureWrapper}>
        {/* Visa vald bild i desktop-läge */}
        <Image
          imageUrl={product.Images[selectedImageIndex].imageUrl}
          altText={`Bild ${selectedImageIndex + 1}`}
          className={style.img}
        />
      </div>

      {/* Mobil-läge: Visa alla bilder i ett bildspel */}
      <div className={style.pictureGrid}>
        {product.Images.map((image, index) => (
          <div 
            key={index}
            style={{ display: "flex", justifyContent: "center" }} 
            onClick={() => setSelectedImageIndex(index)} // Ställer in vald bild vid klick
          >
            <Image
              imageUrl={image.imageUrl}
              altText={`Bild ${index + 1}`}
              className={style.img}
            />
          </div>
        ))}
      </div>

      {/* Höger sidomeny */}
      <div className={style.productDetails}>
        <Details product={product}>
          <div className={style.shopbtn}>
            <button style={{ cursor: "pointer" }} onClick={() => addToCart(product)}>
              Handla
            </button>
          </div>
        </Details>
      </div>
    </main>
  );
};

export default Item;
