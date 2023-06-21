import React from "react";
import { useState } from "react";
import axios from "axios";
const AddCouponForm = () => {
    const [couponName, setCouponName] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [percentDiscount, setPercentDiscount] = useState('');
    const [minimumSpend, setMinimumSpend] = useState('');
    const [maximumDiscount, setMaximumDiscount] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await axios.post('/admin/addcoupon',{couponCode,couponName,startDate,endDate,quantity,percentDiscount,minimumSpend,maximumDiscount},
      {
       headers: {
           Authorization: token,
          
       }
   })
   console.log(response);
      // Form submission logic
      // You can access the form data in the state variables defined above
      // and send it to your backend API
    };
  
    return (
      <div style={{width:'728px',
      marginLeft: '194px'}}>
      <form onSubmit={handleSubmit} id="form">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card card-white">
              <div className="card-heading clearfix">
                <h4 className="card-title">General</h4>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="couponName">Coupon Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="couponName"
                    id="couponName"
                    value={couponName}
                    onChange={(e) => setCouponName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="couponCode">Coupon Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="couponCode"
                    id="couponCode"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="percentDiscount">Discount Percentage</label>
                  <input
                    type="number"
                    className="form-control"
                    name="percentDiscount"
                    placeholder="Enter percentage"
                    id="percentDiscount"
                    value={percentDiscount}
                    onChange={(e) => setPercentDiscount(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin">
            <div className="form-group">
              <label htmlFor="minimumSpend">Minimum Spend</label>
              <input
                type="number"
                className="form-control"
                id="minimumSpend"
                name="minimumSpend"
                value={minimumSpend}
                onChange={(e) => setMinimumSpend(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 grid-margin">
            <div className="card card-white h-100">
              <div className="form-group">
                <label htmlFor="maximumDiscount">Maximum Discount</label>
                <input
                  type="number"
                  className="form-control"
                  id="maximumDiscount"
                  name="maximumDiscount"
                  value={maximumDiscount}
                  onChange={(e) => setMaximumDiscount(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      </div>
    );
  };
  
  export default AddCouponForm;
  