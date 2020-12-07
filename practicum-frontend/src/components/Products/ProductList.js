import React from "react";
import Product from "./Product"
export default function ProductList({title,products}) {
  return  (
        <section id="section" className="section">
          <h1 id="heading-secondary" className="section-title">
            <span>{title}</span>
             
          </h1>
<div className="products-center">
  {
    products.map((item)=>{
      return<Product key={item.id}{...item}></Product>
      
    })
  }
</div>
        </section>
  )
}
