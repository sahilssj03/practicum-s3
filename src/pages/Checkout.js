import React,{useContext, useState,useEffect} from "react";
import {CartContext} from "../context/cart"
import {UserContext} from "../context/user"
import {useHistory} from "react-router-dom"
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import EmptyCart from "../components/Cart/EmptyCart"
import {CardElement,StripeProvider,injectStripe,Elements} from "react-stripe-elements"
// react-stripe-elements
import submitOrder from "../strapi/submitOrder"
 function Checkout(props) {
   const [isEmpty,setIsEmpty]=useState(true)
  const {cart,total,clearCart}=useContext(CartContext)
  const {user,showAlert,hideAlert,alert}=useContext(UserContext)
  const history=useHistory()
  // state values
  const [name,setName]=useState("")
  const [emailId,setEmailId]=useState("")
  const [phoneNumber1,setPhoneNuber1]=useState("")
  const [phoneNumber2,setPhoneNuber2]=useState("")
  const [state,setState]=useState("")
  const [city,setCity]=useState("")
  const [Address,setAddress]=useState("")
  const [pincode,setPincode]=useState("")
  const [error,setError]=useState("")
   
  async function handleSubmit(e){
    showAlert({
      msg:"submitting order... wait"
    })
  e.preventDefault()
  const response =await props.stripe.createToken().catch(err=>console.log(err))
  const{token}=response
   if(token){
     setError("")
    const{id}=token;
    let order=await submitOrder({name:name,total:total,items:{cart,email:emailId,phoneNumber1:phoneNumber1,phoneNumber2:phoneNumber2,state:state,city:city,address:Address,pincode:pincode},stripeTokenId:id,userToken:user.token })
    if (order){
    showAlert({msg:"order complete"})
    clearCart()
    history.push("/")
    return;
    }else{
showAlert({msg:"there was an error... please try again!",type:"danger"})
    }
   }else{
   hideAlert()
   setError(response.error.message)
   }
   setName(name=>"")
  
   setEmailId(emailId=>"")
  
  setPhoneNuber1(phoneNumber1=>"")
  
  setPhoneNuber2(phoneNumber2=>"")
  setState(state=>"")
  setCity(city=>"")
  
  setAddress(Address=>"")
  
  setPincode(pincode=>"")
  setIsEmpty(true)
  
  }
  useEffect(()=>{console.log(isEmpty);
    const interval=setTimeout(() => {
      hideAlert()
    }, 8000);
    if(name!==""&&emailId!==""&&phoneNumber1 !==""&&phoneNumber2!==""&&state!==""&&city!==""&&Address!==""&&pincode!==""){
      setIsEmpty(false)
    }
    return ()=>clearTimeout(interval)
  })
  
  if(cart.length<1)
  return <EmptyCart></EmptyCart>
  return  (
     <section id="checkout-form-container" className="form">
       <h2 id="checkout-heading" className="section-title">
         checkout
       </h2>
       <form id="checkout-form"  className="checkout-form">
         <h3>
           <span>order total</span> <span><HiOutlineCurrencyRupee/>{total}</span>
             
         </h3>
         {/* single input */}
         <div className="form-control">
           
           <input placeholder="Name" type="text"id="name"value={name}onChange={(e)=>setName(e.target.value)} /> <label htmlFor="name">name</label>
         </div>
         {/* single input end */}
         {/* single input */}
         <div className="form-control">
           
           <input placeholder="Email" type="email"id="email"value={emailId}onChange={(e)=>setEmailId(e.target.value)} /> <label htmlFor="email">email</label>
         </div>
         {/* single input end */}
         {/* single input */}
         <div className="form-control">
           
           <input placeholder="ex-981-3909-811" pattern="[0-9]{3}-[0-9]{4}-[0-9]{3}"type="tel"id="number1"value={phoneNumber1}onChange={(e)=>setPhoneNuber1(e.target.value)} /> <label htmlFor="number1">Phone Number</label>
         </div>
         {/* single input end */}
         {/* single input */}
         <div className="form-control">
           
           <input placeholder="ex-981-3909-999" type="tel"id="number2"value={phoneNumber2}onChange={(e)=>setPhoneNuber2(e.target.value)} /> <label htmlFor="number2">Alternate phone number</label>
         </div>
         {/* single input end */}
         {/* single input */}
         <div className="form-control">
           
           <input placeholder="State" type="text"id="state"value={state}onChange={(e)=>setState(e.target.value)} /> <label htmlFor="state">state</label>
         </div>
         {/* single input end */}
         {/* single input */}
         <div className="form-control">
           
           <input placeholder="City" type="city"id="city"value={city}onChange={(e)=>setCity(e.target.value)} /> <label htmlFor="city">city</label>
         </div>
         {/* single input end */}
         {/* single input */}
         <div className="form-control">
           
           <input placeholder="Address" type="text"id="address"value={Address}onChange={(e)=>setAddress(e.target.value)} /> <label htmlFor="address">Address</label>
         </div>
         {/* single input end */}
         {/* single input */}
         <div className="form-control">
           
           <input  placeholder="PIN CODE" type="number"id="pin-code"value={pincode}onChange={(e)=>setPincode(e.target.value)} /> <label htmlFor="pin-code">pin code</label>
         </div>
         {/* single input end */}
         {/* card element */}
         <div className="stripe-input">
           <label htmlFor="card-element">
             credit or debit card
           </label>
           <p className="stripe-info">
          test using this credit cart : <span>4242 4242 4242 4242</span> <br/>
          enter any 5 digits for zip code<br></br>
          enter any 3 digits for CVC
           </p>
         </div>
         {/*end of card element */}
         {/* stripe elements */}
         <CardElement className="card-element"></CardElement>
         {/* stripe errors */}
         {
           error && <p className="form-empty">
             {error}
           </p>
         } 
         {isEmpty ? <p className="form-empty">
           please fill out all fields
         </p> : <button className="checkout-btn" onClick={handleSubmit}>
           submit
         </button>   }
       </form>
     </section>
  )
}
const CardForm=injectStripe(Checkout);
const StripeWrapper=()=>{
  return <StripeProvider
   apiKey="pk_test_51HlbLoK1ED9U7Hukekyy8LgHl4b6b9Gq4o9DcWAX5GsN6sqsLIOoyban9WUbZtd8e0BJkj6N24bJhqsk3SosCmKa00tPP4DmqY"
   >
    <Elements>
      <CardForm></CardForm>
    </Elements>
  </StripeProvider>
}
export default StripeWrapper