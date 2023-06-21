import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import { AdminContext } from '../../config/AdminContext';
import axios from 'axios';
export default function Login(){
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email,setEmail] = useState('')
  const [password,setPassword]= useState('')
  const navigate = useNavigate()
  const {setAdmin} = useContext(AdminContext)
  const  HandleSubmit = async (e)=> {
    e.preventDefault()
  
    try {
        const response = await axios.post('/admin/adminlogin', { email, password });
        console.log(response.data.token);
      // Handle success response
      const {token }=await response.data
     
      setToken(token);
      // Store token in local storage or cookies
      localStorage.setItem('token', token);
      setEmail('');
        setPassword('');
      navigate('/')
      setAdmin(response.data.admin)
      if(response.data.status=="true"){
        alert('logged in successfully')
     
      }else{alert('something went wrong')
    navigate('/sign-in')}
      
          navigate('/admin')
        
      } catch (error) {
        console.error(error); // Handle error
      }
    }
    return (
      <div style={{    display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'}}>
      <form style={{    height: '22rem',
    width: '29rem'}} onSubmit={HandleSubmit}>
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
        <p className="not registered text-right">
          not <a href="/admin/sign-up">registered  yet?</a>
        </p>
      </form>
    </div>
    )
    }
