import React from "react";
import {Link} from "react-router-dom"
export default function Error() {
  return (
  <section className="error-page-component">
    <div className="error-container">
      <h1>oops! it's a dead end</h1>
      <Link to="/products" className="back-to-products">
       back to  products
      </Link>
    </div>
  </section>)
}
