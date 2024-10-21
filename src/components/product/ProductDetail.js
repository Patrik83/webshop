import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartManager";
import style from "../../styles/ProductItem.module.css";
import Image from "./ProductImage";
import Details from "./ProductInfo";
import Carousel from "../carousel/Carousel";

const Item = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <main className={style.productWrapper}>

      {/* Bild-karusell desktop */}
        <Carousel>
          {product.Images.map((image, index) => (
            <div>
                <img
                  key={index}
                  src={`/webshop/images/${image.imageUrl}`}
                  alt={`Bild ${index + 1}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedImageIndex(index)}
                />
            </div>
          ))}
        </Carousel>
      
      {/* Bild-karusell mobil */}
      <div className={style.pictureGrid}>
        {product.Images.map((image, index) => (
          <div 
            key={index}
            style={{ display: "flex", justifyContent: "center" }} 
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              imageUrl={image.imageUrl}
              altText={`Bild ${index + 1}`}
              className={style.img}
            />
          </div>
        ))}
      </div>

      {/* Stor produktbild desktop */}
      <div className={style.pictureWrapper}>
          <Image
            imageUrl={product.Images[selectedImageIndex].imageUrl}
            altText={`Bild ${selectedImageIndex + 1}`}
            className={style.productImage}
          />
      </div>

      {/* Höger sidomeny */}
      <div className={style.productDetails}>{/* flex parent */}
        <Details product={product}> {/* flex child */}
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