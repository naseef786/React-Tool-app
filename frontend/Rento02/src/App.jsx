import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route,useLocation, Link } from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LogIn from './pages/Login'
import SignUp from './pages/Signup'
import Home from './pages/Home'
import Profile from './components/Profile/Profile'
import Cart from './Components/Cart/Cart'
import Wishlist from './components/Folder/Wishlist'
import About from './components/Banner/Banner'
import Checkout from './components/Checkout/Checkout'
import View from './components/View/View';
import { useState,useEffect } from 'react';

import {UserContextProvider} from './config/AuthContext'
import axios from 'axios';
import Navbar from './components/adminComponents/Navbar';
import AdminProfile from './components/adminComponents/AdminProfile';
import AdminLogin from './components/adminComponents/AdminLogin';
import AdminSignUp from './components/adminComponents/AdminSignUp';
import Users from './components/adminComponents/Users';
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
            {change?null:<Header/>}
           
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/sign-in" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About/>} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/productdetails/:id" element={<View />} />

          <Route path='/admin' element={<Navbar/>}/>
              <Route element={<Navbar/>}>
        <Route path='/admin/users' element={<Users/>}/>
        <Route path='/admin/profile' element={<AdminProfile/>}/>
        <Route path='/admin/sign-in' element={<AdminLogin/>}/>
        <Route path='/admin/sign-up' element={<AdminSignUp/>}/>
        
        </Route>



              <Route/>
            </Routes>
          
 
<Footer/>
</UserContextProvider>
    </>
  )
}


export default App

