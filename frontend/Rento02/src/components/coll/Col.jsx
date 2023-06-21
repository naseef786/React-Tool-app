import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";
    import { useNavigate} from "react-router-dom";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
    import React from "react";
    import axios from "axios";
  
    import { useState,useEffect,useContext } from "react";
import { UserContext } from "../../config/AuthContext";
 function Col() {
  const nav = useNavigate()
  const { user } = useContext(UserContext);

  if (!user) {
    return nav("/sign-in");
  }
  const [cart,setCart] = useState([]);
  const [userCart,setUserCart] = useState([]);
  const [coupon,setCoupon] = useState([]);
  const [totalPrice,setTotalPrice] = useState(0);
  const [total,setTotal] = useState(0)
  const [selectedCoupon, setSelectedCoupon] = useState('');


  const [token, setToken] = useState(localStorage.getItem('token') || '');
  useEffect(()=>{
    fetchCart();
  }, []);
  const fetchCart = async() => {
    try {
        const response = await axios.get("/Cart", {
            headers: {
                Authorization: token,
            }
        });
        console.log(response.data);
        setCart(response.data.Cart);
        setUserCart(response.data.cartProducts)
        setCoupon(response.data.coupdata)
        setTotalPrice(response.data.totalPrice)
   
        let totalPrice = 0;
         
      let total =  userCart.map((product) => {
         return totalPrice += product.price * product.quantity;
        });

        setTotal(total);

       
    } catch (error) {
        console.log(error);
        // Handle error (e.g., display error message)
    }
};
console.log(total);
const handleCartDelete = async (productId)=>{
  try {
    const response = await axios.post("/deleteCart",{productId}, {
        headers: {
            Authorization: token,
        }
    });
    console.log(response.data);
    fetchCart()
   
} catch (error) {
    console.log(error);
    // Handle error (e.g., display error message)
}
}
const handleCouponChange = (event) => {
  setSelectedCoupon(event.target.value);
};
const handleRegister = async() => {
//   const response = await axios.post("/checkout",{selectedCoupon,totalPrice} ,{
//     headers: {
//         Authorization: token,
//     }
// });
// console.log(response.data);
const handleNavigation = () => {
  const currentPath = window.location.pathname;
  const newPath = currentPath.replace('/Cart', '/checkout');
  const orderData = {
    // Add your order data properties here
    // For example:
   
    totalPrice:totalPrice,
    coupons: selectedCoupon || null,
   
   
  };
  // Convert the orderData to query parameters
  nav('/checkout', { state: orderData });
  // Navigate to the Checkout page with the query parameters
 
 
};
handleNavigation()
}









// Navigate to the Checkout page and pass orderData as state





    return (
      
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      {cart.length > 0?(<MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                         {cart.length}
                        </MDBTypography>
                      </div>
    
    {cart.map(product=>{
      return (
        <>
        <hr className="my-4" />
    
                      <MDBRow  key={product.id} className="mb-4 d-flex justify-content-between align-items-center">
                        <MDBCol md="2" lg="2" xl="2">
                          <MDBCardImage
                           src={`/images/uploads/${product.image}`}
                            fluid className="rounded-3" alt="Cotton T-shirt" />
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3">
                          <MDBTypography tag="h6" className="text-muted">
                          {product.brand}
                          </MDBTypography>
                          <MDBTypography tag="h6" className="text-black mb-0">
                           
                           {product.name}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                        <MDBTypography tag="h6" className="text-black mb-0">
                           
                           {product.description}
                          </MDBTypography>
                          </MDBCol>
                        {/* <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>
    
                          <MDBInput type="number" min="0" defaultValue={1} size="sm" />
    
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </MDBCol> */}
                        <MDBCol md="3" lg="2" xl="2" className="text-end">
                          <MDBTypography tag="h6" className="mb-0">
                          {product.price}
                          </MDBTypography>
                          <MDBIcon icon='trash-alt' />
                        </MDBCol>
                        <MDBCol md="1" lg="1" xl="1" className="text-end">
                          <a href="#!" className="text-muted">
                            <MDBIcon fas icon="times" />
                          </a>
                          <FontAwesomeIcon onClick={()=>{
                            handleCartDelete(product.id)
                          }} icon={faTrashAlt} />
                        </MDBCol>
                      
                      </MDBRow>
                      
                      </>
      )
    })}

  
  
                      
    
                      <hr className="my-4" />
    
                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" href="#!" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                            to shop
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                        Summary
                      </MDBTypography>
    
                      <hr className="my-4" />
    
                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          items {cart.length}
                        </MDBTypography>
                        <MDBTypography tag="h5">€{totalPrice}.00</MDBTypography>
                      </div>  
    
                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                       {userCart.map(item=>{
                          return(
                            <><MDBTypography tag="h6">name : {item.productName}</MDBTypography>
                            <MDBTypography tag="h6">quantity : {item.quantity}</MDBTypography>
                            <MDBTypography tag="h6">days for Rent :{item.daysOfRent}</MDBTypography>
                            </>
                          )
                        })}
                      </MDBTypography>
  
                     
    
                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                      <select id="coupon" value={selectedCoupon} onChange={handleCouponChange}>
        <option value="">Select a coupon</option>
        {coupon.map((coupon) => (
          <option key={coupon.id} value={coupon.couponCode}>
           {coupon.couponCode}
          </option>
        ))}
      </select>
      
                      </MDBTypography>
    
                      <div className="mb-5">
                        <MDBInput size="lg" label="Enter your code" value={selectedCoupon} />
                        
                      </div>
    
                      <hr className="my-4" />
    
                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">€ {totalPrice}.00</MDBTypography>
                      </div>
    
                      <MDBBtn onClick={()=>{
                        handleRegister()
                      }} color="dark" block size="lg">
                        Register
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>)
      :(<div className="">
      <MDBTypography tag="h1" style={{display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    paddingTop: '218px',
    paddingBottom: '183px'}}>
        No items added to cart yet...
      </MDBTypography>
     
    </div>)}
      
    </section>
    );
    }
    export default Col