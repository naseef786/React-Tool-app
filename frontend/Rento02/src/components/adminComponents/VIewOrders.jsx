import React from 'react';
import './Wishlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useEffect,useState, } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ViewOrders = () => {

    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    useEffect(() => {
      // Fetch coupon data from the backend API
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const response = await axios('/admin/orders', {
            headers: {
              Authorization: token,
            }
           
          }); // Replace with your backend API endpoint
          console.log(response.data.orderList);
          setOrders(response.data.orderList);
        
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };
    const navigate = useNavigate()
    const handleNavigation = (id) => {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace('/admin/admin',`/admin/orderEdit/${id}`);
      navigate(newPath);
    };
    const formatDateTime = (dateTime) => {
      if (!dateTime) return ''; // Handle empty or undefined dateTime value
  
      const dateObj = new Date(dateTime);
      const formattedDate = dateObj.toLocaleDateString(); // Format: MM/DD/YYYY
      const formattedTime = dateObj.toLocaleTimeString(); // Format: HH:MM:SS AM/PM
  
      return `${formattedDate} ${formattedTime}`;
    };
  
    
    return (

      <div>
      <h1>Order Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>Total Price</th>
            <th>payment</th>
            <th>paymetent status</th>
            <th>edit</th>
            <th>delete</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderId}</td>
              <td>{formatDateTime(order.orderDate) }</td>
              <td>{order.orderStatus}</td>
              <td>{order.totalPrice}</td>
              <td>{order.payment}</td>
              <td>{order.paymentStatus}</td>
               <td>  <a  className="text-success">
                      <FontAwesomeIcon icon={faEdit} onClick={()=>{handleNavigation(order.id)}} className="mx-1" />
                    </a></td>

               <td className="Remove-col">
                    <FontAwesomeIcon onClick={() => {
                      handleOrderDelete(order.id)
                    }} icon={faTrashAlt} />
                  </td>
              {/* Add more table columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>


      );
  };
  
  export default ViewOrders;
  