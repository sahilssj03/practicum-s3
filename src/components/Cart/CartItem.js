import React from "react";
import {useHistory} from "react-router-dom"
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import {FaAngleUp,FaAngleDown}from "react-icons/fa"
import {CartContext}from "../../context/cart"
export default function CartItem({id,image,name,price,amount}) {
  const {removeItem,increaseAmount,decreaseAmount}=React.useContext(CartContext)
  const history=useHistory()
  return(
    <article className="cart-item">
      <img style={{
          cursor:"pointer"
        }} onClick={()=>history.push(`/products/${id}`)} src={image} alt={name} className="cart-item-img"/>
      <div>
        <h4 style={{
          cursor:"pointer"
        }} onClick={()=>history.push(`/products/${id}`)}>
          {name}
        </h4>
        <h5>
          <HiOutlineCurrencyRupee/>{price}
        </h5>
        <button type="button" className="remove-cart-item" onClick={()=>{
           
           return removeItem(id)
        }}>remove</button>
      </div>
      <div>
        <button className="amount-btn-increase" onClick={()=>increaseAmount(id)}>
          <FaAngleUp></FaAngleUp>
        </button>
        <p className="item-amount"><span>{amount}</span> </p>
<button className="amount-btn-decrease" onClick={()=>decreaseAmount(id)}>
  <FaAngleDown></FaAngleDown>
</button>
      </div>
    </article>
  )  
}
