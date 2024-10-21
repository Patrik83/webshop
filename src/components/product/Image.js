import React from "react";

const Image = ({ imageUrl, altText, className }) => {
    return (
        <img
            src={`/webshop/images/${imageUrl}`}
            alt={altText}
            className={className}
        />
    )
}

export default Image;