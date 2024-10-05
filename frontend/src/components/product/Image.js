import React from "react";
import { getImageUrl } from "./utils";

const Image = ({ imageUrl, altText }) => {
    return (
        <img
            src={getImageUrl(imageUrl)}
            alt={altText}
        />
    )
}

export default Image;