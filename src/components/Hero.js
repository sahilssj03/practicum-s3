import React from "react";
 
export default function Hero({children}) {
  
  return  (
  <div className="hero">
    <div className="banner">
      <h2>looking for a special gift for <br/><h3> the book lover</h3></h2>
      <p>
        here  is your destination
      </p>
      {
        children
      }
    </div>
    <div className="picture-container">
       
    </div>
  </div>
  )
}
