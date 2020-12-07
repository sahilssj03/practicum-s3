import React,{useState} from "react";
import {useParams} from "react-router-dom"
import {ProductContext} from "../context/products"
import Loading from "../components/Loading"
import {useHistory} from "react-router-dom"
import {CartContext} from "../context/cart"
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import Images from "../components/Images"
export default function ProductDetails() {
   const [index,setIndex]=useState(0)
  const {id}=useParams()
   const history=useHistory()
   const {products} =React.useContext(ProductContext)
   const{addToCart}=React.useContext(CartContext)
   const product=products.find(product=>product.id===parseInt(id))
    if(products.length===0){
return <Loading></Loading>
    } else{
      const {image,language,name,publish_date,description,price,author}=product
      const url=image[0]
      return <section id="single-product-section" className="single-product">
        <div><img src={image[index]} alt="" className="single-product-image"/>
        <div className="gallery">
{
  image.map((image,index)=>{
    return <img className="gallery-image" onClick={()=>setIndex(index)} src={image}/>
  })
}
        </div></div>
         
        <article>
          <h1>
             {name}
    <h6>{`By  ${author} | ${publish_date}`}</h6>
    <h6>{`Main Language ${language}`}</h6>
          </h1>
          <h2>
            <HiOutlineCurrencyRupee/>{price}
          </h2><p>
            {description}
          </p>
          <button className="addtocart-btn"  onClick={()=>{
            // add to cart
            addToCart(product)
            history.push("/cart")
          }}>add to cart</button>
        </article>
      </section>
    }
}
