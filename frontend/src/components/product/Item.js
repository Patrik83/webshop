import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartManager";
import ImageSelector from "../../shared/ImageViewer";
import style from "../../styles/ProductItem.module.css";
import Image from "./Image";
import Details from "./Details";

const Item = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <main className={style.productWrapper}>
      {/* Små produktbilder */} {/* LEFT BOX */}
      <div className={style.imgSmallWrapper}>
        <ImageSelector images={product.Images} onImageClick={setSelectedImageIndex} />
      </div>
      {/* Stor produktbild */} {/* MIDDLE BOX */}
      <div className={style.pictureWrapper}>
          <Image
            imageUrl={product.Images[selectedImageIndex].imageUrl}
            altText={`Bild ${selectedImageIndex + 1}`}
            className={style.img}
          />
      </div>

      {/* Höger sidomeny */} {/* RIGHT BOX */}
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