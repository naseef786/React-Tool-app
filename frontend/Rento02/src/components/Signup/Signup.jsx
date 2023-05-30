import React from 'react'
import axios from 'axios'
import { useState,useContext } from 'react';

export default function Lognin() {

  const [userName,setUserName] = useState('')
const [email,setEmail] = useState('')
const [phone,setPhone] = useState('')
const [password,setPassword]= useState('')

const  HandleSubmit = async (e)=> {
  e.preventDefault()

  try {
    const response = await axios.post('/signup', { userName,phone, email, password });
    console.log(response.data); // Handle success response
   
  } catch (error) {
    console.error(error); // Handle error
  }
}

    return (
      <form onSubmit={HandleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={userName}
            onChange={(e)=>{setUserName( e.target.value)}}
            name="name"
           
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input className="form-control"
           placeholder="phone"
           type="number"
           id="lname"
           value={phone}
           onChange={(e)=>{setPhone(e.target.value) }}
           name="phone"
           />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>{setEmail(e.target.value) }}
            name="email"
          
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
      
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }


  // const response = await fetch('https://localhost:3000/user/login',{
  //   method: 'POST',
  // Headers:{
  //   'Content-Type': 'application/json'
  // },
  // body:JSON.stringify({
  //   userName,
  //   email,
  //   phone,
  //   password
  // }),})
  // const data = await response.json()
  // console.log(data)