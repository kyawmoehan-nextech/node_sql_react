import React from 'react'

const ProductCard = ({ product ,deleteProduct}) => {
    const {id, name, price, description } = product;
    return (
        <div>
            <h2>{name}</h2>
            <p>{price}</p>
            <p>{description}</p>
            <button onClick={() => deleteProduct(id)}>Delete</button>
        </div>
    )
}

export default ProductCard
