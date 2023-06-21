import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

const OrderEditPage = () => {
      
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [formData, setFormData] = useState({
    orderId: '',
    orderStatus: '',
    paymentStatus: '',
    deliveryStatus: '',
  });

  useEffect(() => {
    // Fetch the order data from the server or API
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/admin/editOrder/${id}`, {
            headers: {
              Authorization: token,
            }
           
          });
        const data = await response.data.data
        console.log(data);
        setOrder(data); // Assuming the order data is returned from the API
        setFormData({
          orderId: data.orderId,
          orderStatus: data.orderStatus,
          paymentStatus: data.paymentStatus,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the update request to the server or API using formData
    console.log(formData);
    // Redirect or show success message
  };

  return (
    <div style={{width:'728px',
      marginLeft: '194px'}}>
      <h1>Edit Order</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="orderId">
          <Form.Label>Order ID</Form.Label>
          <Form.Control
            type="text"
            name="orderId"
            value={formData.orderId}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="orderStatus">
          <Form.Label>Order Status</Form.Label>
          <Form.Control
            as="select"
            name="orderStatus"
            value={formData.orderStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Select order status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="deliveryStatus">
          <Form.Label>delivery Status</Form.Label>
          <Form.Control
            as="select"
            name="orderStatus"
            value={formData.deliveryStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Select order status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="paymentStatus">
          <Form.Label>Payment Status</Form.Label>
          <Form.Control
            as="select"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Select payment status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Order
        </Button>
      </Form>
    </div>
  );
};

export default OrderEditPage;
