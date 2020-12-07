import React,{useEffect,useContext,useState,useRef} from 'react'
import {ProductContext} from "../../context/products"
import {HiOutlineCurrencyRupee} from "react-icons/hi"
 
const Filters = () => {
    const refContainerFilter =useRef()
    const refContainerGenre =useRef()
    const refContainerAuthor =useRef()
    const refContainerPrice =useRef()
    const refContainerSale =useRef()
      
    const {filters:{search,category,shipping,price,author,sale},updateFilters,sorted,clearFilters}=useContext(ProductContext)
     
     const [categories_array]=useState(["all",...new Set(sorted.flat()
     .map(({category})=>{return category}))])
     const [authors]=useState(["all",...new Set(sorted.flat()
     .map(({author})=>{return author.toLocaleUpperCase()}))])
     let categories=categories_array.flat()
     categories=categories.map(cat=> cat.toLocaleUpperCase())
      categories=[...new Set(categories)]
      const handleDropdown=(e)=>{
      if(refContainerFilter.current.style.height==="12rem"){
      refContainerFilter.current.style.height="auto"
      }
      else{
          refContainerFilter.current.style.height="12rem"
      }
      
      }
      const handleGenreDropdown=(e)=>{
           if(refContainerGenre.current.style.display==="none"){
      refContainerGenre.current.style.display="flex"
      console.log("hello");
      }
      else{
          refContainerGenre.current.style.display="none"
          console.log("no");
      }
      }
      const handleAuthorDropdown=(e)=>{
           if(refContainerAuthor.current.style.display==="none"){
      refContainerAuthor.current.style.display="flex"
       
      }
      else{
          refContainerAuthor.current.style.display="none"
           
      }
      }
      const handlePriceDropdown=(e)=>{
           if(refContainerPrice.current.style.display==="none"){
      refContainerPrice.current.style.display="block"
       
      }
      else{
          refContainerPrice.current.style.display="none"
           
      }
      }
      const handleSaleDropdown=(e)=>{
           if(refContainerSale.current.style.display==="none"){
      refContainerSale.current.style.display="block"
       
      }
      else{
          refContainerSale.current.style.display="none"
           
      }
      }
      useEffect(()=>{
          refContainerFilter.current.style.height="12rem"
          refContainerGenre.current.style.display="none"
          refContainerAuthor.current.style.display="none"
          refContainerPrice.current.style.display="none"
          refContainerSale.current.style.display="none"
          
           
           
        },[])
    return (
         <section ref={refContainerFilter}  id="filters-section" className="filters-section">
             <button onClick={handleDropdown}   id="filters-heading" className="section-title">
               <span>filter products</span>   
             </button>
    
             <form id="filters-form" className="filters-form" onSubmit={(e)=>e.preventDefault()}>
                 <div>
<div id="form-group" className="form-group">
    {/* search product input */}
     
    <input className="form-control" placeholder={"book name goes here".toLocaleUpperCase()} type="text"id="search" name="search" value={search} onChange={updateFilters}/>
    {/* end of search product input */}
     
</div>
<div className="author-category-flexbox">
{/* select categories */}
    
    <div    className="form-group-category">
    <button onClick={handleGenreDropdown} className="filter-heading-category" htmlFor="category"> selected genre <span>{category}</span> </button>
        <div    ref={refContainerGenre}  name="category" id="category-container" className="form-control" value={category} >
             {
                 categories.map((category,index)=>{
                 return <button onClick={updateFilters} className={"category active-category"} id={index} key={index} >{category}</button>
                 })
             }
        </div>
    </div>
    
    {/* select categories end */}
    {/* select authors */}
    <div className="form-group-author">
            <button onClick={handleAuthorDropdown} className="filter-heading-category" htmlFor="category">selected author <span>{author}</span>  </button>
        <div ref={refContainerAuthor} name="category" id="author-container" className="form-control" value={category} >
             {
                 authors.map((category1,index)=>{
                 return <button onClick={updateFilters} className={`author  active-author `} id={index} key={index} >{category1}</button>
                 })
             }
        </div>
    </div>
    
    {/* select authors end */}
</div>
     
     
                 </div>
                 <div className="price-group">
                <p onClick={handlePriceDropdown}>price</p>
                <div ref={refContainerPrice}>
                    <label ><input checked={price==="all"} onChange={updateFilters} type="radio" name="price" value="all" /> <span>all</span> </label><br/>
                <label ><input checked={price===0} onChange={updateFilters} type="radio" name="price" value="0" /> <span><HiOutlineCurrencyRupee/>0 - <HiOutlineCurrencyRupee/>300</span> </label><br/>
                <label ><input checked={price===300} onChange={updateFilters} type="radio" name="price" value="300" /> <span><HiOutlineCurrencyRupee/>300 - <HiOutlineCurrencyRupee/>650</span>  </label><br/>
                <label ><input checked={price===650} onChange={updateFilters} type="radio" name="price" value="650" /> <span>over <HiOutlineCurrencyRupee/>650</span> </label><br/>
                </div>
                 
                 </div>
                 <div className="price-group">
                <p onClick={handleSaleDropdown}> SALES</p><div ref={refContainerSale}>
                    <label ><input checked={sale==="all"} onChange={updateFilters} type="radio" name="sale" value="all" /> <span>all</span> </label><br/>
                <label ><input checked={sale===0} onChange={updateFilters} type="radio" name="sale" value="0" /> <span>0M - 20M</span> </label><br/>
                <label ><input checked={sale===20} onChange={updateFilters} type="radio" name="sale" value="20" /> <span>20M - 30M</span>  </label><br/>
                <label ><input checked={sale===30} onChange={updateFilters} type="radio" name="sale" value="30" /> <span>30M - 50M</span> </label><br/>
                <label ><input checked={sale===50} onChange={updateFilters} type="radio" name="sale" value="50" /> <span>50M - 100M</span> </label><br/>
                <label ><input checked={sale===100} onChange={updateFilters} type="radio" name="sale" value="100" /> <span> {`  >`} 100M</span> </label><br/>
                </div>
                 
                 </div>
                 {/* free shipping */}
    <div className="form-group">
        <input type="checkbox"checked={shipping} onChange={updateFilters} name="shipping" id="shipping"/><label htmlFor="shipping">free shipping</label>
    </div>
    {/* end of free shipping */}
             </form>
    <h6 id="show-total-products">total products : {sorted.flat().length}</h6>
                 <hr/>
            <button onClick={clearFilters} className="clear-filters">clear filters</button>
         </section>
    )
}

export default Filters
