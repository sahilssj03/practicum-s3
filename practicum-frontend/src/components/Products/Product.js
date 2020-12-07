import React from "react";
import {Link} from "react-router-dom"
 
import {HiOutlineCurrencyRupee} from "react-icons/hi"
export default function Product({id,name,price,image }) {
  const url=image[0]
  return <article id="product" className="product">
  
<div id="img-container" className="img-container">
  <img src={url} alt={name} id="product-img"/>
   </div>
 
    
  
<div id="product-footer" className="product-footer">
  <p id="product-title" className="product-title">
    {name}
  </p>
  <p id="product-price" className="product-price">
    <HiOutlineCurrencyRupee/>{price}
  </p>
  <Link id="product-detail-btn" className="btn btn-primary product-link" to={`/products/${id}`}>details</Link>
</div>
 
  </article>
}
