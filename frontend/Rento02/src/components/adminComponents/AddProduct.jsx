import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
const AddProductForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [richDescription, setRichDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [categories, setCategories] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || '');
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
   const response = await axios.post('/admin/addproduct',{name,category,brand,richDescription,isFeatured,price,countInStock,description,formData,image},
   {
    headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
    }
})
console.log(response);
    // Form submission logic
    // You can access the form data in the state variables defined above
    // and send it to your backend API
  };

  return (
    <div style={{width:'728px',
    marginLeft: '194px'}}>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="row">
        <div className="col-sm-6">
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group col-md-6">
          <label>Category Name *</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {/* Render the options dynamically based on your data */}
            {categories.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group col-md-6">
          <input
            type="file"
            name="image"
            className="form-control"
            id="inputGroupFile02"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label className="input-group-text" htmlFor="inputGroupFile02">
            Upload
          </label>
        </div>

        <div className="col-sm-6">
          <label>Brand Name *</label>
          <input
            type="text"
            name="brand"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
      </div>

      <label>Description</label>
      <input
        type="text"
        className="form-control"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Rich Description</label>
      <input
        type="text"
        className="form-control"
        name="richDescription"
        value={richDescription}
        onChange={(e) => setRichDescription(e.target.value)}
        required
      />

      <label>isFeatured</label>
      <input
        type="text"
        className="form-control"
        name="isFeatured"
        value={isFeatured}
        onChange={(e) => setIsFeatured(e.target.value)}
        required
      />

      <label>Price</label>
      <input
        type="number"
        name="price"
        className="form-control"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label>Product Count</label>
      <input
        type="number"
        className="form-control"
        name="countInStock"
        value={countInStock}
        onChange={(e) => setCountInStock(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-outline-primary-2">
        <span>SAVE CHANGES</span>
        <i className="icon-long-arrow-right"></i>
      </button>
    </form>
    </div>
  );
};

export default AddProductForm;
