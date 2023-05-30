import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate,Outlet } from 'react-router-dom';
import { BsFillCartFill, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import React from 'react';
import { Badge } from 'react-bootstrap';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../config/AuthContext';

export default function AdminNavbar() {
  const { user, setUser } = useContext(UserContext)
  const Logout = () => {
    setUser(false)
    axios.get('/admin/logout')

  }
  return (<>
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar sticky="top" />
      <Container fluid>
        <Navbar.Brand as={Link} to="/admin" className=' ps-5 pe-5' style={{ fontSize: '1.5rem', fontFamily: 'Poppins,sans-serif', fontWeight: 600, }}>R E N T O     <span>  a complete tool shop...</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {!user && <Nav.Link as={Link} to="/admin/sign-in">SignIn</Nav.Link>}
            {!user && <Nav.Link as={Link} to="/admin/sign-up">SignUp</Nav.Link>}
            <Nav.Link as={Link} to="/admin">Products</Nav.Link>
           
            </Nav>
            {!!user && <Badge as={Link} to="/admin/profile">{user.name}</Badge>}
            <Nav.Link as={Link} to="/admin/about">About</Nav.Link>
            {user ? <div onClick={Logout}><AiOutlineLogout /></div> : <Link to='/admin/sign-in'><BsFillPersonFill /></Link>}
         </Navbar.Collapse>
      </Container>

    </Navbar>
     <Outlet/>
     </>
  );
}


