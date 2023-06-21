import React from "react";
import { Container, Breadcrumb, Table } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
function AdminUsers() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [users, setusers] = useState([])
  useEffect(() => {
    fetchUsers()
  }, [])
  const fetchUsers = async () => {
    let response = await axios.get("/admin/adminviewusers", {
      headers: {
        Authorization: token,
      }
    })
    console.log(response.data);
    setusers(response.data.users);
  }
  const nav = useNavigate()
  return (
    <main className="main">
      <div className="page-header text-center" style={{ backgroundImage: "url('http://localhost:3000/assets/images/page-header-bg.jpg')" }}>
        <Container>
          <h1 className="page-title">
            <span>Users</span>
          </h1>
        </Container>
      </div>

      <Breadcrumb aria-label="breadcrumb" className="breadcrumb-nav">
        <Container>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </Container>
      </Breadcrumb>

      <div className="page-content">
        <Container>
          <Table className="table table-wishlist table-mobile">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace with your logic to iterate over user data */}
              {users.map(user => (
                <tr key={user.id}>
                  <td className="Name-col">{user.name}</td>
                  <td className="Email-col">{user.email}</td>
                  <td className="Phone-col">{user.mobile}</td>
                  <td>
                    <FontAwesomeIcon onClick={() => {
                      handleCartDelete(product.id)
                    }} icon={faTrashAlt} />
                  </td>
                  <td className="block"></td>
                  <td className="action-col"></td>
                  <td className="edit-col">
                    <a href={`/admin/productedit/${user.id}`} className="text-success">
                      <i className="fas fa-edit fa-lg mx-1"></i>
                    </a>
                  </td>
                  <td className="edit-col">
                    <a href={`/admin/productedit/`} className="text-success">
                      <FontAwesomeIcon icon={faEdit} className="mx-1" />
                    </a>
                  </td>
                  <td className="remove-col">
                    <a href={`/admin/delete/${user.id}`} className="text-danger">
                      <i className="fas fa-trash fa-lg mx-1"></i>
                    </a>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </main>
  );
}

export default AdminUsers;
