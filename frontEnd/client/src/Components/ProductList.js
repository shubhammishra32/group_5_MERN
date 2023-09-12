import React from 'react';

import ProductItem from './ProductItem';

export const ProductList = (props) => {
    console.log("ppp",props)
    if (props.items?.length === 0) {
        return (
            <div>
                <h2>No Courses Found</h2>
            </div>
        )
    }

    return (
        <ul>
            {props.items?.map(product => 
                <ProductItem 
                    key={product.id} 
                    id={product.id} 
                    image={product.imageUrl} 
                    name={product.name}
                    title={product.title} 
                    description={product.description} 
                    duration={product.duration}
                />)}
        </ul>
    )
}

export default ProductList;