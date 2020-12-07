import React, { useContext } from "react";
import {CartContext} from "../context/cart"
import {UserContext} from "../context/user"
import EmptyCart from "../components/Cart/EmptyCart"
import {FaShoppingBag} from "react-icons/fa"
import CartItem from "../components/Cart/CartItem"
import {Link} from "react-router-dom"
// import {UserContext}from "../context/user"
export default function Cart() {
   const {user}=useContext(UserContext)
  const {cart,total,clearCart}=React.useContext(CartContext)
   if(cart.length===0){
     return <EmptyCart/>
   }return <section className="cart-items-component">
     <h2 className="cart-heading">your bag <FaShoppingBag className="bag-icon"></FaShoppingBag></h2>{

       cart.map((item)=>{
         return <CartItem key={item.id}{...item}></CartItem>
       })
     }
     <button onClick={clearCart} className="clear-cart">clear-cart</button>
     
     <h2 className="total-amount"><span>total</span><span>${total}</span></h2>
      {
       user.token?<Link to="/checkout"className="checkout-link-from-cart
       ">checkout</Link>:<Link className="checkout-link-from-cart
       " to="/login">login</Link>
     }
   </section>
}
