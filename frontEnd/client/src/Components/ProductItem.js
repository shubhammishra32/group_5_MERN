import React from 'react';
import Accordion from './Accordion';
import  {accordionData}  from './content';

const ProductItem = () => {
     

  return (
    <div>
      <h1>React Accordion Demo1</h1>
      <div className="accordion">
        {console.log("aaa",accordionData)}
        {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
          
        ))}
      </div>
    </div>
  );
};

export default ProductItem;