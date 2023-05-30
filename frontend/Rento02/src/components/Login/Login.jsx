import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import { UserContext } from '../../config/AuthContext';
import axios from 'axios';
export default function Login(){

  const [email,setEmail] = useState('')
  const [password,setPassword]= useState('')
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const  HandleSubmit = async (e)=> {
    e.preventDefault()
  
    try {
      const response = await axios.post('/login', { email, password });
      console.log(response.data.user); // Handle success response
      const data =await response.data.user
      navigate('/')
      setUser(data)
      if(data.user){
        alert('logged in successfully')
     
      }else{'something went wrong'}
      
    }
    catch (error) {
      console.error(error); // Handle error
    }}
  
    return (
      <form onSubmit={HandleSubmit}>
        <h3>Sign In</h3>
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
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
