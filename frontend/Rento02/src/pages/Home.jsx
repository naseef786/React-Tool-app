import React,{useState,useEffect} from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Home() {
const [products,setProducts] = useState([])
useEffect(()=>{
 
  fetchProducts()
},[])
const token = localStorage.getItem('token');
  const fetchProducts = async()=>{
  let response = await axios.get("/",{
    headers: {
      Authorization: token,
    }})
console.log(response.data.items);
  setProducts(response.data.items);
}
const nav = useNavigate()

  return (<>
 
   <Container style={{display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'center',
    alignItems: 'baseline',
}}>
   {products.map((product) => (

     <Card key={product.id} style={{ width: '18rem' }} >
     <Card.Img src={`/images/uploads/${product.image}`} alt={product.name} />
     <Card.Body>
       <Card.Title>{product.name}</Card.Title>
       <Card.Text>
        {product.description}
       </Card.Text>
       <Button  onClick={()=>nav(`productdetails/${product.id}`)} variant="primary">Go somewhere</Button>
     </Card.Body>
   </Card>
  
       ))}
   </Container>
   
   </>
    
  
   
    
  )
}

export default Home
