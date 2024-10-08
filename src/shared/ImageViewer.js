import React from "react";

const ImageSelector = ({ images, onImageClick }) => {
  const handleImageClick = (index) => {
    onImageClick(index);
  };

  return (
    <div>
      {images.map((image, index) => (
        <img
          key={index}
          src={`/images/${image.imageUrl}`}
          alt={`Bild ${index + 1}`}
          style={{ cursor: "pointer" }}
          onClick={() => handleImageClick(index)}
        />
      ))}
    </div>
  );
};

export default ImageSelector;