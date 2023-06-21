import React, { useContext, useEffect,useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { UserContext } from "../../config/AuthContext";
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


function View() {
  const nav = useNavigate()
  const { user } = useContext(UserContext);

  
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const { id } = useParams();
  const [products,setProducts] = useState({})
  const [quantity,setQuantity] = useState('1')
  const [days,setDays] = useState('1')
  const navigate  = useNavigate()
  const handleNavigation = () => {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(`/productdetails/${id}`, '/Cart');
      navigate(newPath);
    };
  useEffect(()=>{
    fetchProducts()
  },[])
    const fetchProducts = async()=>{
     
    let response = await axios.get(`/productdetails/${id}`,{
      headers: {
        Authorization: token,
      }})
  console.log(response.data);
    setProducts(response.data.product);
  }
  const ProductId = products.id
  const handleAddToCart = async (productId) => {
    
    try {
      
      if (!user) {
        return nav("/sign-in");
      }
        
       const response =  await axios.post("/addtoCart",{ProductId,quantity,days}, {
          headers: {
              Authorization: token,
              'Content-Type': 'application/json'
          }

        })
        handleNavigation()
    } catch (error) {
        console.log(error);
        // Handle error (e.g., display error message)
    }
};


  return (
    <div >
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Card className="shadow-lg p-3 mb-5 bg-body-tertiary rounded border border-0 mx-auto" bg="light" text="dark" style={{ width: '30rem', margin: '2rem' }}>
          <Card.Img
            variant="top"
            src={`/images/uploads/${products.image}`}
            style={{ height: "250px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{products.name}</Card.Title>
            <Card.Text>{products.description}</Card.Text>
            <Card.Title> ₹{products.price}</Card.Title>
            <div style={{display:'flex'
                           ,flexDirection:'row' }}>
            <p style={{paddingTop:'12px'}} >quantity : </p>
            <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>
    
                          <MDBInput type="number" 
                           min="0"
                            defaultValue={1}
                            
                             size="sm"
                             onChange={(e) => setQuantity(e.target.value)} />
    
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </MDBCol>
                        <p style={{paddingTop:'12px'}} >days for rent : </p>
            <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>
    
                          <MDBInput type="number" 
                           min="0"
                            defaultValue={1}
                            
                             size="sm"
                             onChange={(e) => setDays(e.target.value)} />
    
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </MDBCol>
                        </div>
            <p>shiping<br/>Auctor eros suspendisse tellus venenatis</p>
            <Button onClick={()=>{handleAddToCart(products.id)}} className="btn-cart" variant="primary">
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
    
      </div>
    </div>
  );
}

export default View;