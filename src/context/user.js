// user context
import React,{useState,useContext,createContext} from 'react'
const UserContext=createContext()
function getUserFromLocalStorage(){
    return localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{username:null,token:null}
}
const UserProvider = ({children}) => {
    const [user,setUser]=useState(getUserFromLocalStorage())
    const [height,setHeight]=useState(0)
    React.useEffect(()=>{
        window.addEventListener("scroll",()=>{
            setHeight(window.pageYOffset)
        })
        return ()=>{
            return window.removeEventListener("scroll",()=>{})
        }
    })
    const userLogin=user=>{
        setUser(user)
        localStorage.setItem("user",JSON.stringify(user))
    }
    const userLogout=()=>{
        setUser({username:null,token:null})
        localStorage.removeItem("user")
    }
    const [alert,setAlert]=useState({
        show:false,msg:"",type:"success"
    })
    const showAlert=({type="success",msg})=>{
setAlert({show:true,msg,type})

    }
    const hideAlert=()=>{
        setAlert({...alert,show:false})
    }
        return (
        <UserContext.Provider value={{height,
            user,userLogin,userLogout,alert,showAlert,hideAlert
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider,UserContext}
