//login user
import url from "../utils/URL"
import axios from "axios"
export default async function loginUser({password,email}){
    console.log(email,password);
const response =await axios.post(`${url}/auth/local`,{
    identifier:email,
    password
}).catch(error=>{
    console.log(error);
})
return response
}