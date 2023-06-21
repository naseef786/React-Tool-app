import React, { useContext } from 'react';
import './wishlist.css';
import { useEffect, useState, } from 'react';
import { useParams, useNavigate,useHref } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { UserContext } from '../../config/AuthContext';
import axios from 'axios';
;

function Wishlist() {
    const navigate  = useNavigate()
    const [wishList, setWishList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const {setWishlist,user} = useContext(UserContext)
    const { id } = useParams();
    useEffect(() => {
        fetchWishList();
    }, [Wishlist]);

    const fetchWishList = async () => {
        try {
            if (!user) {
                return navigate("/sign-in");
              }
            const response = await axios.get("/api/Wishlist", {
                headers: {
                    Authorization: token,
                }
            });
            
            setWishList(response.data.products);
            setWishlist(response.data.products);
        } catch (error) {
            console.log(error);
            // Handle error (e.g., display error message)
        }
    };
    const deleteWishlist = async (wishId) => {

        try {
            const response = await axios.post("/deleteWish", { wishId }, {
                headers: {
                    Authorization: token,
                }
            });
            console.log(response.data);
            fetchWishList()
        } catch (error) {
            console.log(error);
            // Handle error (e.g., display error message)
        }
    }
 
    const handleNavigation = (id) => {
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace('/wishlist', `/productdetails/${id}`);
        navigate(newPath);
      };

    return (
        <div className="col-md-12">
            {wishList.length > 0 ? (<div className="row row-border pt-2 pb-2">
                <div className="col-md-2 col-lg-2 d-flex align-items-center">
                    <h5>My Wishlist</h5>
                </div>
                {wishList.map(wish => {
                    return (
                        <div key={wish.id} className="col-md-2 col-lg-2 mt-2 mb-2">
                            <div className="card text-center">
                                <div className="card-body ">
                                    <button onClick={() => { deleteWishlist(wish.id) }} className="btn btn-sm btn-outline-secondary d-flex">&#10006;</button>
                                    <img className="img-thumbnail img-tumbnail-clean" src={`/images/uploads/${wish.image}`} alt={wish.name} />
                                    <p>{wish.name}</p>
                                    <Button className="btn-cart" onClick={() => {
                handleNavigation(wish.id)
                            }} variant="primary">
                                Add to Cart
                            </Button>
                                </div>
                            </div>
                       
                        </div>
                    )
                })}
            </div>) : (<div className="noWish">
                <h3 style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    paddingTop: '218px',
                    paddingBottom: '183px'
                }}> no items added to wishlist yet</h3>
            </div>)}

        </div>
    )
}


export default Wishlist;