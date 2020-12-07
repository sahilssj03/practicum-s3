import React from "react";
import {ProductContext} from "../context/products"
import Loading from "../components/Loading"
import ProductList from "../components/Products/ProductList"
import Filters from "../components/Products/filters"
import PageProducts from "../components/Products/pageProducts"
export default function Products() {
const {loading,sorted}=React.useContext(ProductContext)
  if(loading){
    
    return <Loading></Loading>
  }
   return (
   <>
           <Filters></Filters>
           
           <PageProducts></PageProducts>
   </>)
}
