// cart context
import React,{useContext,useState} from 'react'
import localCart from "../utils/localCart"
export const CartContext=React.createContext()
function getCartFromLocalStorage(){
    return localStorage.getItem("cart")?
    JSON.parse(localStorage.getItem("cart")):[]
}
export const CartProvider = ({children}) => {const [cart,setCart]=useState(getCartFromLocalStorage())
const [total,setTotal]=useState(0)
const [cartItems,setCartItems]=useState(0)

const removeItem=(id)=>{
     setCart([...cart].filter(item=>item.id!==id))
}
const increaseAmount=(id)=>{
    const item=[...cart].map(item=>{
        return item.id===id?{...item,amount:item.amount+1}:{...item}
    })
    setCart(item)
}
const decreaseAmount=id=>{
     const item=[...cart].map(item=>{
        return item.id===id?{...item,amount:item.amount-1}:{...item}
    }).filter(item=>item.amount!==0)
    setCart(item)
}
const addToCart=(product)=>{
    
    const{
    id,
    name,
    price,
    image,
     
  }=product
   
  const newProduct={id,name,price,image:image[0],amount:1}
   const item=[...cart ].find(item=>item.id===id)
   if(item){
       increaseAmount(id)
       return
   }
   else{
       const newItems=[...cart,newProduct]
       setCart(newItems)}
  
   
} 
const clearCart=()=>{
    setCart([])
}
React.useEffect(()=>{
    // local storage
    localStorage.setItem("cart",JSON.stringify(cart))
    let newCartItems=cart.reduce((total,cartItem)=>{
        total+=cartItem.amount
        return total
    },0)
    setCartItems(newCartItems)
    let newTotal=cart.reduce((total,cartItem)=>{
        return total+=((cartItem.amount)*(cartItem.price))
    },0)
    newTotal=parseFloat(newTotal.toFixed(2))
    setTotal(newTotal)
},[cart])
    return (
          <CartContext.Provider value={{
              total,cart,cartItems,removeItem,increaseAmount,decreaseAmount,addToCart,clearCart
          }}>
             {children}
         </CartContext.Provider>
    )
}

 
