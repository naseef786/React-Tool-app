// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import { BsFillCartFill, BsFillPersonFill } from "react-icons/bs";
// import { AiOutlineLogout } from "react-icons/ai";
// import React from 'react';
// import { Badge } from 'react-bootstrap';
// import axios from 'axios';
// import { useContext } from 'react';
// import { UserContext } from '../../config/AuthContext';

// export default function Header() {
 
//   const Logout = () => {
//     setUser(false)
//     axios.get('/logout')

//   }
//   return (
//     <Navbar bg="light" expand="lg" sticky="top">
//       <Navbar sticky="top" />
//       <Container fluid>
//         <Navbar.Brand as={Link} to="/" className=' ps-5 pe-5' style={{ fontSize: '1.5rem', fontFamily: 'Poppins,sans-serif', fontWeight: 600, }}>R E N T O     <span>  a complete tool shop...</span></Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             {!user && <Nav.Link as={Link} to="/sign-in">SignIn</Nav.Link>}
//             {!user && <Nav.Link as={Link} to="/sign-up">SignUp</Nav.Link>}
//             <Nav.Link as={Link} to="/">Products</Nav.Link>
//             {!!user && <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>}
//             {!!user && <Nav.Link as={Link} to="/checkout">checkout</Nav.Link>}
//             {!!user && <Nav.Link as={Link} to="/placeOrder">Your Orders</Nav.Link>}
//             {user ? <Nav.Link as={Link} to='/Cart'><BsFillCartFill /></Nav.Link> : null}
//             </Nav>
//             {!!user && <Badge as={Link} to="/profile">{user.name}</Badge>}
//             <Nav.Link as={Link} to="/about">About</Nav.Link>
//             {user ? <div onClick={Logout}><AiOutlineLogout /></div> : <Link to='/sign-in'><BsFillPersonFill /></Link>}
//          </Navbar.Collapse>
//       </Container>

//     </Navbar>
//   );
// }




import React, { useContext } from 'react'
import { Button, Container, Navbar, Nav,Image } from "react-bootstrap";
import { NavLink, useNavigate } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import profile from '../../assets/user.png'
import logo from '../../assets/cart.png'
import axios from 'axios';
import { UserContext } from '../../config/AuthContext';
import '../Header/header.css'


function Header() {
  const { user, setUser } = useContext(UserContext)
  const nav = useNavigate()
 
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
   <Container>
  <Navbar.Brand >
            <h2   style={{color: 'black',marginRight: '8px',
    marginLeft: '-50px'}} >Rento  <p>tools</p></h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar" >
          {!!user && <NavLink className="navbar-link" to="/wishlist"> Wishlist</NavLink> } 
            
          <NavLink className="navbar-link" to="/"> Home</NavLink>
          <NavLink className="navbar-link" to="/"> Products</NavLink>
              
             {user? null : <NavLink className="navbar-link" to="/sign-up"> Sign Up</NavLink>} 
             {!user && <NavLink className="navbar-link" to="/sign-in"> Sign In</NavLink> }    
            
             {!!user &&  <NavLink className="navbar-link" to="/placeOrder"> Orders</NavLink>}     
              <NavLink className="navbar-link" to="/about"> About Us</NavLink>
              {!!user &&   <NavLink to="/profile">
                Profile
                <Image src={profile} alt="profile" height={20} width={20} />
              </NavLink>} 
              {!!user && <NavLink className="navbar-link" to="/cart">Cart
              <img src={logo} alt="cart" width={25} height={25} srcSet="" />
              </NavLink> } 
             
              {!!user && <NavLink className="navbar-link">
                <Button  variant='outline-secondary'
                  onClick={()=>{
                    if(localStorage.getItem('token')){
                      localStorage.clear()
                      setUser('')
                      if (!user) {
                        return nav("/sign-in");
                      }
                    }
                  }}
                  size="sm"
                  className="logout"
                  >
                  <div className='login-btn'>
                  {!user && <NavLink to="/login"> </NavLink>}   
                </div>
                </Button>
                </NavLink>}    
          </Nav>
          </Navbar.Collapse>
          </Container>
          </Navbar>
  
  
      
    </div>
  )
}

export default Header


