import React,{useCallback, useContext} from "react";
import {Link,useHistory}from "react-router-dom"
import {UserContext} from "../context/user"
import {CartContext} from "../context/cart"
export default function LoginLink() {
  const history=useHistory()
  const {user,userLogout}=useContext(UserContext)
  const {clearCart}=useContext(CartContext)
   if(!user.token){
     return <Link to="/login">login</Link>
   }else{
  return  <button className="login-btn" onClick={()=>{
      userLogout()
      clearCart()
      history.push("/login")
    }}>logout</button> 
   }
}
