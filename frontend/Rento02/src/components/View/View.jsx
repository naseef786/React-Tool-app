import React, { useContext, useEffect,useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";



function View() {
  const nav =useNavigate()
 
  const { id } = useParams();
  const [products,setProducts] = useState({})
  useEffect(()=>{
    fetchProducts()
  },[])
    const fetchProducts = async()=>{
    let response = await axios.get(`http://localhost:3000/productdetails/${id}`)
  console.log(response.data);
    setProducts(response.data.product);
  }
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
            <p>shiping<br/>Auctor eros suspendisse tellus venenatis</p>
            <Button className="btn-cart" variant="primary">
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
    
      </div>
    </div>
  );
}

export default View;