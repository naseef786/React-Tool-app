import React,{useContext,useState,useEffect} from 'react';
import { json, useNavigate,useParams } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { UserContext } from '../../config/AuthContext';
import axios from 'axios';
import'./pro.css'
export default function Home(){
  const [products,setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const {WishList,setWishlist,user} = useContext(UserContext)
  const [ itemId, setId] = useState('');
  const { id } = useParams();
  useEffect(()=>{
  
          axios.get("/", {
              headers: {
                  Authorization: token,
              }
          }).then(response =>{
          console.log(response.data.items);
          setProducts(response.data.items);}
          )
  }, []);

 

  const nav = useNavigate();




  
  const handleAddToWishlist = async (itemId) => {
    
      try {
        if (!user) {
          return nav("/sign-in");
        }
        
          console.log(itemId + " added to wishlist");
          
          const response = await axios.post("/wishlist",{itemId}, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
          });
         console.log(response.data.wishlist);
         
      } catch (error) {
          console.log(error);
          // Handle error (e.g., display error message)
      }
  };
  const handleToggleWishlist = (product) => {
    if (isInWishlist(product)) {
      handleAddToWishlist(product.id);
    } else {
      handleAddToWishlist(product.id);
    }
  };
  const isInWishlist = (product) => {
    return WishList.some((item) => item.id === product.id);
  };

  return (
    <div id="CatalogProducts" >
      <div className="row">
        {products.map(product => {
            return (
              <div key={product.id} className=" col-lg-3 mt-3">
                <div className="card text-center">
                  <div className="card-body " style={{height:'375px'}}>
                  <button
                  style={{display:'flex'}}
                      onClick={() => handleToggleWishlist(product)}
                      className="btn btn-sm btn-outline-secondary mt-4"
                     >
                        {isInWishlist(product) ? 'Remove from Wishlist' :'❤️ add to Wishlist'}
                    </button>
                    
                    <img
                    onClick={()=>nav(`productdetails/${product.id}`)}
                      className="img-thumbnail img-tumbnail-clean"
                      src={`http://localhost:3000/../${product.image}`} alt={product.name}/>
                 <h3 className="card-subtitle mb-2 text-muted">{product.name}</h3>
                 <Button className="btn-cart" onClick={()=>{
                nav(`productdetails/${product.id}`)
                 }} variant="primary">
                 Add to Cart
                 </Button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}


