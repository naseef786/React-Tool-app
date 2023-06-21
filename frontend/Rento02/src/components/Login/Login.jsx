import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import { UserContext } from '../../config/AuthContext';
import axios from 'axios';






export default function Login(){

  const [email,setEmail] = useState('')
  const [password,setPassword]= useState('')
  const navigate = useNavigate()
  const {setUser,user} = useContext(UserContext)
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  if (user) {
    return navigate("/");
  }
  const  HandleSubmit = async (e)=> {
    e.preventDefault()
  
    try {
      const response = await axios.post('/login', { email, password });
      console.log(response.data.token); // Handle success response
      const {token }=await response.data
     
      setToken(token);
      // Store token in local storage or cookies
      localStorage.setItem('token', token);
      setEmail('');
        setPassword('');
      navigate('/')
      setUser(response.data.user)
      if(response.data.status=="true"){
        alert('logged in successfully')
     
      }else{alert('something went wrong')
    navigate('/sign-in')}
      
    }
    catch (error) {
      console.error(error); // Handle error
    }}
  
    return (
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
             
            <form onSubmit={HandleSubmit}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
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

            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
 