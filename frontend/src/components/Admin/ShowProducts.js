import React from "react";
import style from "../../styles/Admin.module.css";

const ShowProducts = ({ products, categories, selectedImages, onEditProduct }) => {

  return (
    <div className={style.wrapper}>
      <div className={style.headerRow} >
        <span>Bilder</span>
        <span>Namn</span>
        <span>Pris</span>
        <span>Kategori</span>
      </div>
      {products.map((product) => {
        // Hitta rätt kategori till rätt produkt
        const category = categories.find(category => 
          category.id === product.Categories[0]?.id
        );

        return (
          <div className={style.productRow} key={product.id}>
            <div>
              {product.Images.map((image) => (
                <div key={image.id} className={style.images}>
                  <img
                    src={selectedImages[product.id]?.[image.id]
                      ? URL.createObjectURL(selectedImages[product.id][image.id])
                      : `/images/${image.imageUrl}`}
                      alt="Product"
                    />
                  </div>
                ))}
            </div>
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>{category.name}</div>
            <div>
              <button onClick={() => onEditProduct(product)}>
                Redigera
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowProducts;
