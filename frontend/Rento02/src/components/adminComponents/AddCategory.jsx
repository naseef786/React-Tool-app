import { useState } from "react";
import React from "react";
import axios from  "axios";




const AddCategoryForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setSelectedImage] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const handleImageChange = (event) => {
      setSelectedImage(event.target.files[0]);
    };
   
    const handleSubmit = async(e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', image);
     const response = await axios.post('/admin/addcategory',{name,description,formData,image},
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
  
    return (<div style={{width:'728px',
      marginLeft: '194px'}}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Category Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <small className="form-text">Specifies the name of a Category</small>
  
        <label>Category Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <small className="form-text">Specifies the description of a Category</small>
  
        <div className="form-group col-md-6">
        <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
          <small className="form-text">Specifies the image of a Category</small>
          {/* <label className="input-group-text" htmlFor="inputGroupFile02">
            Upload
          </label> */}
        </div>
  
        <button type="submit" className="btn btn-outline-primary-2">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right"></i>
        </button>
      </form>
      </div>
    );
  };
  
  export default AddCategoryForm;
  