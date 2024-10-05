import React from "react";

const Details = ({ product, children }) => {
    return (
        <>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            {children}
        </>
    );
};

export default Details;