import React from 'react';
import ProductList from './ProductList';


const Dummy_Data = [
    {
        id: "p1",
        name: 'Pradumn Kumar',
        title: 'MERN',
        description: 'Interested in this MERN internship oppourtunity.',
        imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
        duration: '2 months'
    },
    {
        id: "p2",
        name: 'Pavan Kumar',
        title: 'JAVA',
        description: 'Interested in this Java internship oppourtunity..',
        imageUrl: 'https://dev.java/assets/images/java-logo-vert-blk.png',
        duration: '2 months'
    },
    {
        id: "p3",
        name: 'Shashank',
        title: 'C#',
        description: 'Interested in this C# internship oppourtunity..',
        imageUrl: 'https://static.javatpoint.com/csharp/images/c-sharp.png',
        duration: '2 months'
    },
   
]

export const Products = () => {
    return (
        <>
            <h2>Interester Candidates Names for Internship</h2>
            <ProductList items={Dummy_Data} />
        </>
    )
}

export default Products;