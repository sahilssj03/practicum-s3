// products context
import React,{useState,useContext,useEffect} from 'react'
import axios from "axios"
import url from "../utils/URL"
import {featuredProducts} from "../utils/helpers"
import {flattenProducts,paginate} from "../utils/helpers"
export const ProductContext=React.createContext();
const ProductProvider = ({children}) => {
    const [products,setProducts]=useState([])
    const [featured,setFeatured]=useState([])
    const [loading,setLoading]=useState(true)
    //  extra state values
    const[sorted,setSorted]=useState([]);
    const [page,setPage]=useState(0)
    const [filters,setFilters]=useState({
        search:"",category:"all",shipping:false,price:"all",
        author:"all",sale:"all"
    })
    useEffect(() => {

        setLoading(true)
          axios.get(`${url}/products`).then((response)=>{
              const products=flattenProducts(response.data)
              const featured=featuredProducts(products)
              setFeatured(featured)
              setSorted(paginate(products));
              setProducts(products)
              
               
              setLoading(false)
          })
    },[])
    useEffect(()=>{
        // sort wrt to price
    let newProducts=[...products].sort((a,b)=>{
        return a.price-b.price})

        const {search,category,shipping,price,author,sale}=filters
        if(author!=="all"){
            newProducts=newProducts.filter(item=>{
                 return item.author.toLocaleLowerCase()===author.toLowerCase()
             
        })
        }
        if(category!=="all"){
        
            newProducts=newProducts.filter(item=>{
                const categories=item.category.map(cat=>{
                    return cat.toLocaleLowerCase()
                })
                return categories.includes(category.toLowerCase())
             
        })
    }
        if(shipping!==false){
            newProducts=newProducts.filter(({free_shipping})=>free_shipping===true)
        }
         
        if(search!==""){
            newProducts=newProducts.filter(({name})=>name.toLocaleLowerCase().trim().includes(search.toLocaleLowerCase().trim()))
        }
        if(price!=="all"){newProducts=newProducts.filter((item)=>{
                if(price==0){
                    return item.price<300
                }
                if(price===300){
                    return item.price<650 && item.price >300
                }
                return item.price>650
            })
            
        }
        if(sale!=="all"){
      
              newProducts=newProducts.filter((item)=>{
             
                if(sale===0){
                    return item.approx_sales<20
                }
                if(sale===20){
                    return item.approx_sales<30 && item.approx_sales >=20
                }
                if(sale===30){
                    return item.approx_sales<50 && item.approx_sales >=30
                }
                if(sale===50){
                    return item.approx_sales<100 && item.approx_sales >=50
                }
                else return item.approx_sales>=100
            })
        }
     
    setPage(0)
    setSorted((paginate(newProducts)))
    },[filters,products])
    const changePage=(index)=>{
        setPage(index)
    }
    const clearFilters=()=>{
        setFilters(filter=>{
            return {
        search:"",category:"all",shipping:false,price:"all",author:"all",sale:"all" 
    }
        })
    }
    const updateFilters=(e)=>{
         
         const target=e.target
         const type=target.type
 
         let filter=target.name
         const value=target.value
         let filterValue;
          
          if(type==="checkbox"){
              filterValue=target.checked
          }else if (type==="radio"){
              value==="all"?(filterValue=value):filterValue=parseInt(value)
          }else{
              filterValue=value
          }
          if(e.target.classList.contains("category")){
              filter="category";
              filterValue=e.target.innerHTML.toLocaleLowerCase();
          }
          if(e.target.classList.contains("author")){
              filter="author";
               
              filterValue=e.target.innerHTML.toLocaleLowerCase();
          }
         setFilters(filters=>{
             return {...filters,[filter]:filterValue}
         })
        
    }
    return ( 
         <ProductContext.Provider
         value=
         {{products,loading,featured,sorted,page,filters,changePage,updateFilters,clearFilters}}>
             {children}
         </ProductContext.Provider>
    )
}

export default ProductProvider
