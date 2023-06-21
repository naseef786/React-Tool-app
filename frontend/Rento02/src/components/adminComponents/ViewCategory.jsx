import React, { useState,useEffect, } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
function ViewCategory() {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [categories,setCategories] = useState([])
    useEffect( () =>{
        fetchCategory()
       },[])
       const fetchCategory = async()=>{
         const response =  await axios.get('/admin/adminviewcategories',{
           headers: {
               Authorization: token,
              
           }
       })
       console.log(response.data.categories);
       setCategories(response.data.categories);
       }
  return (
    <div>
          <div className="page-content">
      <div className="container">
        <table className="table table-wishlist table-mobile">
          <thead>
            <tr>
              <th>Category Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Count</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} id={`row${category._id}`}>
                <td className="product-col">
                  <div className="product">
                    <figure className="product-media">
                      <a href={`/admin/viewproductsC/${category.id}`}>
                        <img src={`http://localhost:3000/../${category.image}`} style={{width: '73px'}} alt="Product image" />
                      </a>
                    </figure>
                  </div>
                </td>
                <td className="title-col">{category.name}</td>
                <td className="Descrition-col">{category.description}</td>
                <td className="Count-col">{category.products.length}</td>
                <td className="Ed-col">
                  {/* Add your edit button JSX here */}

                    <a href={`/admin/productedit/`} className="text-success">
                      <FontAwesomeIcon icon={faEdit} className="mx-1" />
                    </a>
                  
                 
                    
                </td>
            
                <td className="Remove-col">
                    <FontAwesomeIcon onClick={() => {
                      handleCartDelete(category.id)
                    }} icon={faTrashAlt} />
                  </td>
                  
            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default ViewCategory
