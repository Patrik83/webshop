import React from "react";

const Image = ({ imageUrl, altText }) => {
    return (
        <img
            src={`/webshop/images/${imageUrl}`}
            alt={altText}
        />
    )
}

export default Image;