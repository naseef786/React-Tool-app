import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route,useLocation, Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LogIn from './pages/Login'
import SignUp from './pages/Signup'
import Home from './components/adminComponents/AdminHome'
import Profile from './components/Profile/Profile'

import Wishlist from './components/Wishlist/Wishlist'
import About from './components/Banner/Banner'
import Checkout from './components/Checkout/Checkout'
import View from './components/View/View';

import { useState,useEffect } from 'react';
import { UserContext } from './config/AuthContext';
import {UserContextProvider} from './config/AuthContext'
import { AdminContext } from './config/AdminContext';
import { AdminProvider } from './config/AdminContext';
import axios from 'axios';
import PrivateRoute from './routes/Private'
import Navbar from './components/adminComponents/Navbar';
import AdminProfile from './components/adminComponents/AdminProfile';
import AdminLogin from './components/adminComponents/AdminLogin';
import AdminSignUp from './components/adminComponents/AdminSignUp';
import Users from './components/adminComponents/AdminProfileUpdate';
import AddProduct from './components/adminComponents/AddProduct';
import Products from './components/adminComponents/AdminProduct';
import Pro from './components/Products/Pro'
import Col  from './components/coll/Col';
import Order from './components/order/Order';
import PaymentForm from './components/payment/PaymentForm';
import PaymentPage from './components/payment/Pay';
import AddCategoryForm from './components/adminComponents/AddCategory';
import AddCouponForm from './components/adminComponents/AddCoupon';
import OrderEditPage from './components/adminComponents/OrderEdit';
axios.defaults.baseURL = 'http://localhost:3000'

function App() {
const [state,setState] = useState('')
const [change,setChange] = useState(false)

useEffect(()=>{
  location.pathname.includes('admin')? setChange(true):
  location.pathname.includes('login')? setChange(true):setChange(false)
},[location])
  return (

    <>
<UserContextProvider>
<AdminProvider>
            {change?null:<Header/>}
           
            <Routes>
             
              <Route exact path="/" element={<Pro />} />
              <Route path="/sign-in" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/placeOrder" element={<Order />} />
              <Route path="/cart" element={<Col />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About/>} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/productdetails/:id" element={<View />} />
              <Route path="/payment" element={<PaymentPage/>} />

          <Route path='/admin' element={<Navbar/>}/>
              <Route element={<Navbar/>}>
        <Route path='/admin/adminProfileUpdate' element={<Users/>}/>
        <Route path='/admin/addProduct' element={<AddProduct/>}/>
        <Route path='/admin/admin' element={<Home/>}/>
        <Route path='/admin/adminprofile' element={<AdminProfile/>}/>
        <Route path='/admin/sign-up' element={<AdminSignUp/>}/>
        <Route path='/admin/sign-in' element={<AdminLogin/>}/>
        <Route exact path='/admin/home' element={<Home/>}/>
        <Route path='/admin/addCategory' element={<AddCategoryForm/>}/>
        <Route path='/admin/addCoupon' element={<AddCouponForm/>}/>
        <Route path="/admin/orderEdit/:id" element={<OrderEditPage />} />
        <Route path='/admin/products' element={<Products/>}/>
        
        </Route>

     

              <Route/>
            </Routes>
          
 
<Footer/>
</AdminProvider>
</UserContextProvider>
    </>
  )
}


export default App

