import React from "react";
import {Link ,useHistory}from "react-router-dom"
import logo from "../assets/logo.svg"
import {UserContext}from "../context/user"
import LoginLink from "../components/LoginLink"
import CartLink from "../components/Cart/CartLink"
export default function Header() {
  const {user}=React.useContext(UserContext)
  const history=useHistory();
  return  <header className="header">
  
 <h3 onClick={()=>history.push("/")} className="project-name">book <span>store</span> </h3>
    <nav>
      <ul>
        <div>
           <li >
             <Link to="/">home</Link>
           </li>
           <li>
             <Link  to="/products">products</Link>
           </li>
           <li>
             <Link  to="/about">about</Link>
           </li>
        </div>
        {user.token && (
          <div>
            <li>
              <Link  to="/checkout">checkout</Link>
            </li>
          </div>
        )}
        <div>
          <LoginLink></LoginLink>
           <CartLink></CartLink>
            
        </div>
      </ul>
    </nav>
  </header>
}
