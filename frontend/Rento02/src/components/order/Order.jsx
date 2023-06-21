import React, { useContext } from 'react';
import './order.css';
import { useEffect, useState, } from 'react';
import { useParams, useNavigate,useHref } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { UserContext } from '../../config/AuthContext';
import axios from 'axios';
;

function Order() {
    const nav =useNavigate()
    const [allOrders, setOrders] = useState([]);
    const [userDetails, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const {setWishlist,user} = useContext(UserContext)
    const { id } = useParams();
    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            if (!user) {
                return nav("/sign-in");
              }
            const response = await axios.get("/viewOrders", {
                headers: {
                    Authorization: token,
                }
            });
            console.log(response.data);
            setOrders(response.data.allOrders);
            setUser(response.data.user)
        } catch (error) {
            console.log(error);
            // Handle error (e.g., display error message)
        }
    };
    const deleteOrder = async (orderId) => {

        try {
            const response = await axios.post("/deleteOrder", { orderId }, {
                headers: {
                    Authorization: token,
                }
            });
            console.log(response.data);
            fetchOrder()
        } catch (error) {
            console.log(error);
            // Handle error (e.g., display error message)
        }
    }
    const navigate  = useNavigate()
    const handleNavigation = (id) => {
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace('/wishlist', `/productdetails/${id}`);
        navigate(newPath);
      };

    
    


          return (
            <main>
              <div className="page-wrapper">
                {allOrders.length > 0 ? (
                  allOrders.map((order) => (
                    <section key={order.id} className="h-100 gradient-custom">
                      <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                          <div className="col-lg-10 col-xl-8">
                            <div className="card" style={{ borderRadius: '10px' }}>
                              <div className="card-header px-4 py-5">
                                <h5 className="text-muted mb-0">
                                  Thanks for your Order,{' '}
                                  <span style={{ color: '#a8729a' }}>{order.user}</span>!
                                </h5>
                              </div>
                              <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                  <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }}>
                                    Receipt
                                  </p>
                                  <p className="small text-muted mb-0">
                                    Receipt Voucher: {order.razorPayDetails.order_Id}
                                  </p>
                                </div>
                                <div className="card shadow-0 border mb-4">
                                  <div className="card-body">
                                    <div key={userDetails.id} className="row">
                                      {order.products.map((product) => (
                                      
                                        <React.Fragment key={product.id}>
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0">Name: {product.productName}</p>
                                          </div>
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">Price: {product.price}</p>
                                          </div>
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">Qty: {product.quantity}</p>
                                          </div>
                                          <div  className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                                
                                              Days Of Rent: {product.daysOfRent}
                                              {product.forEach(  el=>{
                                               return (el.price)
                                              })}
                                            </p>
                                          </div>
                                        </React.Fragment>
                                      ))}
                                    </div>
                                    <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                                    <div className="row d-flex align-items-center">
                                      <div className="col-md-2">
                                        <p className="text-muted mb-0 small">Track Order</p>
                                      </div>
                                      <div className="col-md-10">
                                        <div className="progress" style={{ height: '6px', borderRadius: '16px' }}>
                                          <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                              width: '50%',
                                              borderRadius: '16px',
                                              backgroundColor: '#a8729a',
                                            }}
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                          ></div>
                                        </div>
                                        <div className="d-flex justify-content-around mb-1">
                                          {order.orderStatus === 'cancelled' && (
                                            <p className="text-muted mt-1 mb-0 small ms-xl-5">Order Cancelled</p>
                                          )}
                                          {order.orderStatus === 'confirmed' && (
                                            <p className="text-muted mt-1 mb-0 small ms-xl-5">Order Confirmed</p>
                                          )}
                                          {order.orderStatus === 'delivered' && (
                                            <p className="text-muted mt-1 mb-0 small ms-xl-5">Order Delivered</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
        
                                <div className="d-flex justify-content-between pt-2">
                                  <p className="fw-bold mb-0">Order Details</p>
                                  <p className="text-muted mb-0">
                                    <span className="fw-bold me-4">Total</span> {order.totalPrice}
                                  </p>
                                </div>
        
                                <div className="d-flex justify-content-between pt-2">
                                  <p className="text-muted mb-0">
                                    Invoice Number: <span>{order.orderId}</span>
                                  </p>
                                  <p className="text-muted mb-0">
                                    <span className="fw-bold me-4">Discount</span> {order.discount}
                                  </p>
                                </div>
        
                                <div className="d-flex justify-content-between">
                                  <p className="text-muted mb-0">Invoice Date: {order.orderDate}</p>
                                </div>
        
                                <div className="d-flex justify-content-between mb-5">
                                  <p className="text-muted mb-0">
                                    Recepits Voucher: {order.razorPayDetails.orderId}
                                  </p>
                                  <p className="text-muted mb-0">
                                    <span className="fw-bold me-4">Delivery Charges</span> Free
                                  </p>
                                </div>
                              </div>
                              <div
                                className="card-footer border-0 px-4 py-5"
                                style={{
                                  backgroundColor: '#a8729a',
                                  borderBottomLeftRadius: '10px',
                                  borderBottomRightRadius: '10px',
                                }}
                              >
                                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                  Total paid : <span className="h2 mb-0 ms-2">{order.totalPrice}</span>
                                </h5>
                                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                  payment<span className="h2 mb-0 ms-2">{order.payment}</span>
                                </h5>
                              </div>
                            </div>
                          </div>
                          {order.orderStatus === 'confirmed' && (
                            <form action={`/cancelOrder/${order.id}`} method="post">
                              <button className="btn btn-outline-danger" type="submit" >
                                Cancel Order
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    </section>
                  ))
                ) : (
                  <div className="page-wrapper">
                    <h5
                      style={{
                        display: 'flex',
                        flexDirection: 'centre',
                        flexWrap: 'nowrap',
                        alignContent: 'flex-end',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      You haven't made any orders
                    </h5>
                    <button className="btn btn-outline-danger" >
                      <a>Make an order now</a>
                    </button>
                  </div>
                )}
              </div>
            </main>
          );
        
        

        
    
}


export default Order;


// <div className="col-md-12">
// {orders.length > 0 ? (<div className="row row-border pt-2 pb-2">
//     <div className="col-md-2 col-lg-2 d-flex align-items-center">
//         <h5>My Wishlist</h5>
//     </div>
//     {orders.map(order => {
//         return (
//             <div key={order.id} className="col-md-2 col-lg-2 mt-2 mb-2">
//                 <div className="card text-center">
//                     <div className="card-body ">
//                         <button onClick={() => { deleteOrder(order.id) }} className="btn btn-sm btn-outline-secondary d-flex">&#10006;</button>
//                         <img className="img-thumbnail img-tumbnail-clean" src={`/images/uploads/${order.image}`} alt={wish.name} />
//                         <p>{order.name}</p>
//                         <Button className="btn-cart" onClick={() => {
//                         handleNavigation(order.id)
//                 }} variant="primary">
//                     Add to Cart
//                 </Button>
//                     </div>
//                 </div>
           
//             </div>
//         )
//     })}
// </div>) : (<div className="noWish">
//     <h3 style={{
//         display: 'flex',
//         flexWrap: 'nowrap',
//         justifyContent: 'center',
//         paddingTop: '218px',
//         paddingBottom: '183px'
//     }}> no items have been ordered yet...</h3>
// </div>)}

// </div>