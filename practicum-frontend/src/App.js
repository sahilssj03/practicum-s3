import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Error from "./pages/Error"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProductDetails from "./pages/ProductDetails"
import Products from "./pages/Products"
// global components
import Header from "./components/Header"
import Alert from "./components/Alert"
import PrivateRoute from "./components/PrivateRoute"
import ScrollButton from "./components/Scroll"
import Test from "./testing"
export default function App() {
  return  (
      <Router>
      <Test></Test>
      <Header></Header>
       <Alert></Alert>
       <ScrollButton></ScrollButton>
      <Switch> 
        
      <Route exact  path="/">
      <Home></Home>
      </Route>
      <Route exact path="/about">
      <About></About>
      </Route>
      <Route exact path="/cart">
      <Cart></Cart>
      </Route>
      <PrivateRoute exact path="/checkout">
      <Checkout></Checkout>
      </PrivateRoute><Route exact path="/login">
      <Login></Login>
      </Route><Route exact path="/products">
      <Products></Products>
      </Route><Route exact path="/products/:id"
      children={<ProductDetails></ProductDetails>} />
       
     
      <Route path="*">
        <Error></Error>
      </Route>
      </Switch>
    </Router>
  )
}
