
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Image } from "react-bootstrap";
import { Link, useNavigate, Outlet, Navigate, NavLink } from 'react-router-dom';
import { BsFillCartFill, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import React from 'react';
import { Badge } from 'react-bootstrap';

import axios from 'axios';
import { useContext,useEffect,useState } from 'react';
import { AdminContext } from '../../config/AdminContext';
import profile from '../../assets/user.png'
import logo from '../../assets/cart.png'



export default function AdminNavbar() {
  const { admin, setAdmin } = useContext(AdminContext)
  const nav = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  useEffect(() => {
   
    const fetchUser = async () => {
      try {
        if (token) {
         
          const response = await axios.get('/admin/profile', {
            headers: {
              Authorization: token,
            }
          });
          console.log(response.data);
          let user = response.data
          setAdmin(user.admin);
        
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    fetchUser();
    
  }, []);
  const Logout = () => {
    setAdmin(false)
    axios.get('/admin/logout')

  }
  return (<>
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand >
            <h2 style={{
              color: 'black', marginRight: '8px',
              marginLeft: '-50px'
            }} >Rento  <p>tools</p></h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="navbar" >


              {admin ?<NavLink className="navbar-link" to="/admin/admin"> Home</NavLink>:null}
              <NavLink className="navbar-link" to="/admin/products"> Products</NavLink>

              {admin ? null : <NavLink className="navbar-link" to="/admin/sign-up"> Sign Up</NavLink>}
              {!admin && <NavLink className="navbar-link" to="/admin/sign-in"> Sign In</NavLink>}


              {!admin ? null : <NavLink className="navbar-link" to="/admin/addProduct">add product</NavLink>}
              {!admin ? null : <NavLink className="navbar-link" to="/admin/addCategory">add category</NavLink>}
              {!admin ? null : <NavLink className="navbar-link" to="/admin/addCoupon">add coupon</NavLink>}


              {!!admin && <NavLink to="/admin/adminProfileUpdate">
                update Profile
                <Image src={profile} alt="profile" height={20} width={20} />
              </NavLink>}


              <NavLink className="navbar-link" to="/about"> About Us</NavLink>



              {!!admin && <NavLink className="navbar-link">
                <Button variant='outline-secondary'
                  onClick={() => {
                    if (localStorage.getItem('token')) {
                      localStorage.clear()
                      setAdmin('')
                      if (!admin) {
                        return nav("/admin/sign-in");
                      }
                    }
                  }}
                  size="sm"
                  className="logout"
                >
                  <div className='login-btn'>
                    {!admin && <NavLink to="/admin/sign-in">logout </NavLink>}
                  </div>
                </Button>
              </NavLink>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />


    </div>

  </>
  );
}







