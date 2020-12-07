import React,{useState} from "react";
import {useHistory} from "react-router-dom"
import loginUser from "../strapi/loginUser"
import registerUser from "../strapi/registerUser"
 import {UserContext} from "../context/user"
// strapi functions
// handle users
export default function Login() {
  const history=useHistory()
  const {userLogin,alert,showAlert}=React.useContext(UserContext)

  // setup user context
  // state values
  const [inputFields,setInputFields]=useState({email:"",password:"",username:"default"})
  const [isMember,setIsMember]=useState(true)


let isEmpty=!inputFields.email || !inputFields.password || !inputFields.username || alert.show;

  const toggleMember=(e)=>{
  e.preventDefault()
    setIsMember((prevMember)=>{
      let isMember=!prevMember
      isMember?setInputFields({...inputFields,username:"default"}):setInputFields({...inputFields,username:""})
      return isMember
    })
  
  }
  const handleSubmit=async(e)=>{
    showAlert({
      msg:"accessing user data, please wait..."
    })
    // alert
  e.preventDefault()
  let response;
  if(isMember){
    response=await loginUser(inputFields)
  }else{
    response=await registerUser(inputFields)
  }
  if(response){
     const {jwt:token,user:{username}}=response.data
     const newUser={token,username} 
     userLogin(newUser) 
     showAlert({type:"success",
       msg:`login successfull :${username}, shop away now`,show:true
     })
     history.push("/products")
}
else{
     console.log("failure"); 
     console.log(response);
     showAlert({
       msg:"there was an error, please try again...",show:true,type:"danger"
     })
  }
  }
  const handleInputFields=(e)=>{
const name=e.target.name
const value=e.target.value
setInputFields(inputFields=>{
  return {...inputFields,[name]:value}
})
  }

  return  <section id="login-form-container" className="form">
    <h2 id="create-account" className="section-title">
      {
        isMember?"sign in":"sign up"
      }
    </h2>
    <form id="login-form"  className="login-form">
      <div className="form-control">
         
        <input placeholder={"Email"} id="email" type="text"name="email" value={inputFields.email}onChange={handleInputFields}/><label htmlFor="email">email</label>
        </div>
        <div className="form-control">
       
        <input placeholder="Password" name="password" type="text"id="password"value={inputFields.password}onChange={handleInputFields} />  <label htmlFor="password">password</label>
      </div>
      {!isMember&&(
        <div className="form-control">
           
          <input placeholder="Username" id="username" name="username" type="text"value={inputFields.username}onChange={handleInputFields} /><label htmlFor="username">userName</label>
        </div>
      )}
      {/* empty form text */}
      {isEmpty && <p className="form-empty">
        please fill out all the fields
      </p> }
      {/* submit button */}
      {!isEmpty && <button id="account-btn" className="btn btn-block btn-primary"type="submit" onClick={handleSubmit}>{
        isMember?"sign in":"sign up"
      }</button> }
      {/* register link */}
      <p className="register-link">
        {isMember?"need to register":"already a member"}
        <button className="button" onClick={toggleMember}>click here</button>
      </p>
    </form>
  </section>
}
