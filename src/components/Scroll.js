import React,{useEffect,useContext} from 'react'
import {FaAngleDoubleUp} from "react-icons/fa"
import {UserContext} from "../context/user"
const Scroll = () => {
    const {height}=useContext(UserContext)
    
    const scrollBackToTop=(e)=>{
window.scrollTo({
    top:0,left:0,behavior:"smooth"
})
    }
    return (
       <button style={{fontSize:"3rem"}} onClick={scrollBackToTop} className={height>400?"scroll-btn show-scroll-btn":"scroll-btn"}>
           <FaAngleDoubleUp></FaAngleDoubleUp>
       </button>
    )
}

export default Scroll
