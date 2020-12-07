import React from "react";
import Hero from "../components/Hero"
import {Link } from "react-router-dom"
import FeaturedProducts from "../components/Products/FeaturedProducts"
export default function Home() {
  return  (
    <>
    <Hero>
      <Link to="/products"className="animate_link btn btn-primary btn-hero">all books</Link>
    </Hero>
    <FeaturedProducts></FeaturedProducts>
    <Link id="all-products" to="/products">all books</Link>
    </>
  )
}
