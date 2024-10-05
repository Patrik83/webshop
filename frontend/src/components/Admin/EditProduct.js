import React from "react";
import style from "../../styles/Admin.module.css";
import CloseIcon from '@mui/icons-material/Close';

const EditProduct = ({
  product,
  Categories,
  selectedImages,
  fileInputRefs,
  handleNameChange,
  handlePriceChange,
  handleImageChange,
  handleCategoryChange,
  handleSaveAllChanges,
  onClose
}) => {

  // Filtrerar bort aktuell kategori från visningslistan
  const otherCategories = Categories.filter(category => category.id !== product.Categories[0].id);

  return (
    <div className={style.wrapper}>
      
      <div>
        {/* Ikon för att stänga fönstret */}
        <button className={style.closeBtn} onClick={onClose}>
          <CloseIcon/>
        </button>
      </div>
      <h2>{product.name}</h2>
      <div>
        {product.Images.map((image) => (
          <div key={image.id} className={style.images}>
            <img
              src={selectedImages[product.id] && selectedImages[product.id][image.id]
                ? URL.createObjectURL(selectedImages[product.id][image.id])
                : `/images/${image.imageUrl}`}
              alt="Product"
              style={{ cursor: "pointer" }}
              onClick={(e) => handleImageChange(e, product.id, image.id)}
            />
            {/* Dold bildväljare */}
            <input
              type="file"
              ref={el => fileInputRefs.current[`${product.id}-${image.id}`] = el}
              onChange={(e) => handleImageChange(e, product.id, image.id)}
              style={{ display: "none" }}
            />
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={product.name}
          data-id={product.id}
          onChange={(e) => handleNameChange(e)}
        />
      </div>
      <div>
        <input
          type="number"
          value={product.price}
          data-id={product.id}
          onChange={(e) => handlePriceChange(e)}
        />
      </div>
      <div>
        <select
          value={product.Categories[0].id}
          data-id={product.id}
          onChange={(e) => handleCategoryChange(e)}
        >
          <option value={product.Categories[0].id}>{product.Categories[0].name}</option>
          {otherCategories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <button onClick={() => { handleSaveAllChanges(); onClose(); }}>
        Uppdatera
      </button>
    </div>
  );
};

export default EditProduct;
