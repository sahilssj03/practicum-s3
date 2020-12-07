import React from "react";
import {Link} from "react-router-dom"
export default function EmptyCart() {
  return  <section className="empty-cart-component">
    <h2>empty cart...</h2><br></br>
    <Link to="/products" className="goto-products">
      fill it
    </Link>
  </section>
}
