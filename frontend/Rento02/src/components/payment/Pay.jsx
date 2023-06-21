// PaymentPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './pay.css'
const PaymentPage = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [paymentData, setPaymentData] = useState({});
  const [signature, setSignature] = useState('');
  const [order_id, setOrderId] = useState('');
  const [payment_id, setPaymentId] = useState('');
  const Nav = useNavigate()
  const { state } = location;
  console.log(state);
  const handleThen = async ()=>{
    const response = await axios.post("/success",{signature,order_id,payment_id},{
          headers: {
              Authorization: token,
          }
      });
      console.log(response.data);

  }


  const handlePayment = async () => {
    try {
     

      const options = {
        key:  "rzp_test_xKJur4lyLcX0ZO",
        amount: state.amount,
        currency: state.currency,
        name: state.name,
        description: state.description,
        order_id: state.orderId,
        handler: async function (response) {
            try {
              const paymentData = {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                order_id:state.order_id
              };
  
              // Send the payment data to your backend
              await axios.post('/success', paymentData,{
                headers: {
                    Authorization: token,
                }
            });
  
              alert('Payment successful');
              Nav('/placeOrder')
            } catch (error) {
              console.log(error);
              alert('Failed to capture payment');
              Nav('/')
            }
          },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9876543210',
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
   
        <div className="payment-page">
          <h2>Payment Page</h2>
          <input
            type="text"
            placeholder="Enter amount"
            value={state.amount}
            className="payment-input"
          />
          <div className="order-id">{state.order_id}</div>
          <button className="pay-now-btn" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      );
    }
    



export default PaymentPage;
