import React, { useState } from 'react';
import { loadScript } from './utils'; // Utility function to load Razorpay script dynamically
import { useLocation } from 'react-router-dom';


const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({});
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const { state } = location;
  console.log(state);
  const initializePayment = async () => {
    // Load the Razorpay script dynamically
    await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    // Create a new Razorpay instance
    const razorpay = new Razorpay({
      key: state.key_id, // Replace with your actual Razorpay API key
      // Add any additional options as per your requirements
    });

    // Prepare the payment options
    const options = {
      amount: state.amount, // Amount in paise (e.g., 10000 = ₹100)
      name: state.name,
      email: state.email,
      order_id: state.orderId,
      description: 'Test Payment',
      handler: (response) => {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        setPaymentData(response); 
        // Save payment response to state or send it to the server
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9876543210',
      },
      notes: {
        address: 'Sample Address',
      },
      theme: {
        color: '#F37254',
      },
    };

    // Open the Razorpay payment dialog
    razorpay.open(options);
  };

  return (
    <div>
            <input
        type="text"
        placeholder="Enter amount"
        value={state.amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <h1>Razorpay Payment Form</h1>
      <button onClick={initializePayment}>Pay Now</button>
      {paymentData && (
        <div>
          <h3>Payment Successful!</h3>
          <p>Payment ID: {paymentData.razorpay_payment_id}</p>
          <p>Order ID: {paymentData.razorpay_order_id}</p>
          <p>Signature: {paymentData.razorpay_signature}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
