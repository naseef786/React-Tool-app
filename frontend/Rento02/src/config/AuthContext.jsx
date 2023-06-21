import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({})
export function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null)
  const [WishList, setWishlist] = useState([]);
  const [cart, setCarts] = useState([]);
  const nav = useNavigate()

  useEffect(() => {
   
    const fetchUser = async () => {
      try {
        if (token) {
         console.log(token);
          const response = await axios.get('/profile', {
            headers: {
              Authorization: token,
            }
          });
          setUser(response.data.user);
        
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    fetchUser();
    
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, WishList, setWishlist, cart, setCarts }}>
      {children}
    </UserContext.Provider>
  )
}



