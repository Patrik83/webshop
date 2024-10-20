import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartManager";
import style from "../../styles/ProductItem.module.css";
import Image from "./Image";
import Details from "./Details";
import Carousel from "./Carousel";

const Item = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <main className={style.productWrapper}>

      {/* Dolt i mobilläge */}
        <Carousel>
          {product.Images.map((image, index) => (
            <div style={{display: "flex", justifyContent: "center"}}>
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
      
      {/* Dolt i desktopläge */}
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

      {/* Stor produktbild */}
      <div className={style.pictureWrapper}>
          <Image
            imageUrl={product.Images[selectedImageIndex].imageUrl}
            altText={`Bild ${selectedImageIndex + 1}`}
            className={style.img}
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