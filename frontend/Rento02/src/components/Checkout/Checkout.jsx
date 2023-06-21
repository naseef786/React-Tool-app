import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {UserContext}from '../../config/AuthContext'
function Checkout() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [cart,setCart] = useState([]);
  const [userCart,setUserCart] = useState([]);
  const [coupon,setCoupon] = useState([]);
  const [totalPrice,setTotalPrice] = useState(0);
  const [savedAddress,setSavedAddress] = useState({})
  const { user} = useContext(UserContext)
 const [discout,setDiscout] = useState(Number)
 const [grandTotal,setGrandTotal] = useState(Number)
 const[payment,setPayment] = useState('')
  const [address, setAddress] = useState({
    firstname: '',
    lastname: '',
    Address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    country:''
  });
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };
  
  const location = useLocation();

  const { state } = location;
  useEffect(()=>{
fetchCheckout()
  },[])

  
   
  const fetchCheckout = async() => {
    try {
     
        const response = await axios.post("/checkout2",{
          params: state // Send state as query parameters
        },{
            headers: {
                Authorization: token,
            }
        });
        console.log(response.data);
        
        setCart(response.data.Cart);
        setUserCart(response.data.cartDetails)
        setCoupon(response.data.couponData)
        setTotalPrice(response.data.totalPrice)
        setGrandTotal(response.data.grandTotal)
        setAddress(response.data.address)
        setSavedAddress(response.data.address)
        // let totalPrice = 0;
         
      // let totals =  userCart.map((product) => {
      //    return totalPrice += product.price * product.quantity;
      //   });

      //   setTotal(totals);

       
    } catch (error) {
        console.log(error);
       
    }
};
const nav  = useNavigate()
const [selectedPayment, setSelectedPayment] = useState('');

const handlePaymentSelection = (paymentOption) => {
  setSelectedPayment(paymentOption);
};

  const handlePayment = async (e)=>{
    e.preventDefault();
    if(!user){
      nav('/sign-up')
    }
  try{
    const response = await axios.post("/api/placeOrder",{address,selectedPayment},{
        headers: {
            Authorization: token,
        }
    });

  console.log();
  if(response){
    if (selectedPayment === 'COD') {
      nav('/placeOrder');
    } else if (selectedPayment === 'onlinePay') {
      const handleNavigation = () => {
     
        const orderData = {
                       key_id: response.data.key_id,
                      orderId: response.data.orderId,
                      order_id: response.data.order_id,
                      amount: response.data.amount,
                      name: response.data.name,
                      email: response.data.email,
                      contactNumber: response.data.mobile,
                      response: response.data.response
         
        };
        nav('/payment', { state: orderData });
        // Navigate to the Checkout page with the query parameters
    }
    handleNavigation()
    } else {
      // Handle invalid or unsupported payment option
      console.error('Invalid payment option');
    }
  };
   
  }

catch (error) {
  console.error('Error placing order:', error);
}
  }
  return (
    <div>
      <div className="checkout">
        <div className="container">
          <div className="checkout-discount">
          
          </div>
          <form onSubmit={
                    handlePayment}  >
           {savedAddress?(
            <div>
            <div className="col-lg-9">
            <h2 className="checkout-title">Billing Details</h2>
            <div className="row">
              <div className="col-sm-6">
                <label>First Name *</label>
                <input type="text" name="firstname" onChange={handleChange} defaultValue={savedAddress.firstname} className="form-control" required />
              </div>
              <div className="col-sm-6">
                <label>Last Name *</label>
                <input type="text" name="lastname" onChange={handleChange}defaultValue={savedAddress.lastname} className="form-control" required />
              </div>
            </div>
            <label>Home Address</label>
            <input type="text" name="Address" onChange={handleChange} defaultValue={savedAddress.Address}  className="form-control" required />
            <label>Country *</label>
            <input type="text" name="country" onChange={handleChange} defaultValue={savedAddress.country} className="form-control" required />
            <label>Town / City *</label>
            <input type="text" name="city" onChange={handleChange} defaultValue={savedAddress.city} className="form-control" required />
            <label>State *</label>
            <input type="text" name="state" onChange={handleChange} defaultValue={savedAddress.state} className="form-control" required />
            <label>Postcode / ZIP *</label>
            <input type="number" name="pincode" onChange={handleChange}  defaultValue={savedAddress.pincode} className="form-control" required />
            <label>Phone *</label>
            <input type="tel" name="phone"  onChange={handleChange} defaultValue={savedAddress.phone} className="form-control" required />
          </div>
          </div>
           ):(<div className="col-lg-9">
           <h2 className="checkout-title">Billing Details</h2>
           <div className="row">
             <div className="col-sm-6">
               <label>First Name *</label>
               <input type="text" name="firstname" onChange={handleChange} defaultValue={address.firstname} className="form-control" required />
             </div>
             <div className="col-sm-6">
               <label>Last Name *</label>
               <input type="text" name="lastname" onChange={handleChange}defaultValue={address.lastname} className="form-control" required />
             </div>
           </div>
           <label>Home Address</label>
           <input type="text" name="Address" onChange={handleChange} defaultValue={address.Address}  className="form-control" required />
           <label>Country *</label>
           <input type="text" name="country" onChange={handleChange} defaultValue={address.country} className="form-control" required />
           <label>Town / City *</label>
           <input type="text" name="city" onChange={handleChange} defaultValue={address.city} className="form-control" required />
           <label>State *</label>
           <input type="text" name="state" onChange={handleChange} defaultValue={address.state} className="form-control" required />
           <label>Postcode / ZIP *</label>
           <input type="number" name="pincode" onChange={handleChange} defaultValue={address.pincode} className="form-control" required />
           <label>Phone *</label>
           <input type="tel" name="phone" onChange={handleChange} defaultValue={address.phone} className="form-control" required />
         </div>)} <div className="row">
              
              <aside className="col-lg-3">
                <div className="summary">
                  <h3 className="summary-title">Your Order</h3>

                  <table className="table table-summary">

                    <thead>

                      <tr>
                        <th>product</th>
                        <th>Quantity</th>

                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr>
                        <td><a >this.productName</a></td>
                        <td>this.quantity Piece X this.price X this.daysOfRent</td>

                        <td>this.total</td>
                      </tr>



                      
                      <tr>

                        <td>Shipping:</td>
                        <td>Free shipping</td>
                      </tr>
                      <tr className="summary-total">
                        <td>Total:{totalPrice}</td>
                        <td>grandTotal{grandTotal}</td>
                      </tr>
                    </tbody>
                  </table>

                {!!coupon &&<> <h5>coupon {coupon.couponName}</h5>
                  <input type="" name="coupon" value={coupon.couponCode} className="form-control" required />
                  </> }  


                  {/* <select onChange={(e)=>{
                      setPayment(e.target.value);
                    }} name="payment" required>
                    <option onChange={(e)=>{
                      setPayment(e.target.value);
                    }} value="onlinePay" >Online Payment</option>
                    <option onChange={(e)=>{
                      setPayment(e.target.value);
                    }}  value="COD" >Cash on Delivery</option>
                  </select> */}

<div>
        <h3>Select Payment Option:</h3>
        <div>
          <label>
            <input
              type="radio"
              value="COD"
              checked={selectedPayment === 'COD'}
              onChange={() => handlePaymentSelection('COD')}
            />
            Cash on Delivery
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="onlinePay"
              checked={selectedPayment === 'onlinePay'}
              onChange={() => handlePaymentSelection('onlinePay')}
              required
            />
            Online Payment
          </label>
        </div>
      </div>

                  <button type='submit' className="btn btn-outline-primary-2 btn-order btn-block">
                    <span className="btn-text">Place Order & </span>
                    <span className="btn-hover-text">Proceed to Checkout</span>
                  </button>
                </div>
              </aside>
            </div>
          </form>

  
        </div>
      </div>
    </div>
  )
}

export default Checkout


