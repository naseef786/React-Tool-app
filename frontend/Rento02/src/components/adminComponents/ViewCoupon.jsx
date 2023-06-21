import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const CouponTable = () => {
    const [coupons, setCoupons] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    useEffect(() => {
      // Fetch coupon data from the backend API
      fetchCoupons();
    }, []);
  
    const fetchCoupons = async () => {
      try {
        const response = await axios('/admin/coupons', {
            headers: {
              Authorization: token,
            }
           
          }); // Replace with your backend API endpoint

          setCoupons(response.data.data);
        
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };
  
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card card-white">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-order">
                    <thead>
                      <tr>
                        <th scope="col">
                          <div className="custom-control custom-checkbox mb-0">
                            <input type="checkbox" className="form-check-input" id="exampleCheck" />
                          </div>
                        </th>
                        <th scope="col">ID</th>
                        <th scope="col">Campaigns Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Remaining coupon</th>
                        <th scope="col">Expiration Date</th>
                        <th scope="col">Creation Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((coupon) => (
                        <tr key={coupon._id}>
                          <th scope="row">
                            <div className="custom-control custom-checkbox mb-0">
                              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            </div>
                          </th>
                          <td>{coupon.number}</td>
                          <td>{coupon.couponName}</td>
                          <td>{coupon.couponCode}</td>
                          <td>
                            <div className="custom-progress bg-blue progress mb-2">
                              <div
                                className="animated custom-bar progress-bar slideInLeft"
                                style={{ width: '20%' }}
                                aria-valuemax="100"
                                aria-valuemin="0"
                                aria-valuenow="10"
                                role="progressbar"
                              ></div>
                            </div>
                            <div className="progress-text">
                              <div>{`${coupon.quantity} codes remaining`}</div>
                            </div>
                          </td>
                          <td>{coupon.startDate}</td>
                          <td>{coupon.endDate}</td>
                          <td>
                    <FontAwesomeIcon onClick={() => {
                      handleCartDelete(coupon.id)
                    }} icon={faTrashAlt} />
                  </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-footer">
          <p>
            &copy; <span className="current-year"></span> Smartshop All rights reserved.
          </p>
        </div>
      </div>
    );
  };
  
  export default CouponTable;
  