import React,{ useContext} from 'react'
import ProductList from "./ProductList"
import {FaAngleDoubleRight,FaAngleDoubleLeft} from "react-icons/fa"
import {ProductContext } from "../../context/products"
const PageProducts = () => {
    const {sorted,page,changePage}=useContext(ProductContext)
      
     if(sorted[page]){
         return<>
          <ProductList products={sorted[page]}></ProductList>
          {sorted.length>1 && <article className="pagination-buttons">
     {page>0 && <button id="prev-page-btn" className="prev-page-btn" onClick={()=>changePage(page-1)} >{<FaAngleDoubleLeft></FaAngleDoubleLeft>}</button> }
              {sorted.map((_,index)=>{
                  return <button id={`page-btn ${page===index && "page-btn-current"}`} className={`page-btn ${page===index && "page-btn-current"}`} key={index} onClick={()=>changePage(index)}>{index+1}</button>
              })}
              {page<(sorted.length-1) && <button id="next-page-btn" className="next-page-btn"onClick={()=>changePage(page+1)}>{<FaAngleDoubleRight></FaAngleDoubleRight>}</button> }
          </article> }
          </>
     }
     return  (
         <h3 className="search-errors">
             {" "}
             search results did not matched
         </h3>
     )
}

export default PageProducts
