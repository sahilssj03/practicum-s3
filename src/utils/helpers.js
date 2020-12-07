// helper functions
import url from "./URL"
import loading from "../assets/loading.gif"
export function flattenProducts(data){
return data.map(item=>{
    // claudinary fix
    // local fix
     let images=item.images;
     images=images.map(image=>{
         return image.url
     })
      
     const url=images[images.length-1]
     
    return {
        ...item,image:images
    }
})
}
export function featuredProducts(data){
    return data.filter(item=>item.featured===true)
}
// paginate
export const paginate=(products)=>{
    const itemsPerPage=9;
 const numberOfPages=Math.ceil( products.length/itemsPerPage)
//  const newProducts=Array.from({length:numberOfPages},()=>{
//      return products.splice(0,itemsPerPage)
//  }) 
const newProducts=Array.from({length:numberOfPages},(_,index)=>{
    const start=index*itemsPerPage
    return products.slice(start,start+itemsPerPage)
})
return newProducts
}