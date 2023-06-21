
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/admin/adminviewproducts', {
          headers: {
            Authorization: token,
          }
        }); // Replace with your API endpoint
        setItems(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page-content">
      <div className="container">
        <table className="table table-wishlist table-mobile">
          <thead>
            <tr>
              <th>Product</th>
              <th>Brand</th>
              <th>Title</th>
              <th>Price</th>
              <th>wishlisted</th>
              <th>Stock Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="product-col">
                  <div className="product">
                    <figure className="product-media">
                      <a href={`/productdetails/${item.id}`}>
                        <img src={`http://localhost:3000/../${item.image}`} style={{width: '73px'}} alt="Product image" />
                      </a>
                    </figure>
                  </div>
                </td>
                <td className="brand-col">{item.brand}</td>
                <td className="title-col">{item.name}</td>
                <td className="price-col">{item.price}</td>
                <td className="wishlisted-col">
                  {item.wishList.length}
                  <a href={`/admin/viewwishlisted/${item.id}`}> User added to wishlist</a>
                </td>
                <td className="stock-col">
                  <span className="in-stock">In stock</span>
                </td>
                <td className="edit-col">
                    <a href={`/admin/productedit/`} className="text-success">
                      <FontAwesomeIcon icon={faEdit} className="mx-1" />
                    </a>
                  </td>
                  <td className="remove-col">
                    <a href={`/admin/delete/${item.id}`} className="text-danger">
                      <i className="fas fa-trash fa-lg mx-1"></i>
                    </a>
                    </td>
                    <td>
                    <FontAwesomeIcon onClick={() => {
                      handleCartDelete(product.id)
                    }} icon={faTrashAlt} />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
