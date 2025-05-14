
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const { id: subcategoryId } = useParams(); 

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [stock, setStock] = useState('');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login first');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_description', productDescription);
    formData.append('product_price', productPrice);
    formData.append('stock', stock);
    formData.append('color', color);
    formData.append('material', material);
    formData.append('subcategory', subcategoryId);  

    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/products/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Product added successfully');
        navigate(`/product/${subcategoryId}`);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add Product</h2>

      <label>Product Name</label>
      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} />

      <label>Description</label>
      <textarea value={productDescription} onChange={e => setProductDescription(e.target.value)} />

      <label>Price</label>
      <input type="number" value={productPrice} onChange={e => setProductPrice(e.target.value)} />

      <label>Stock</label>
      <input type="number" value={stock} onChange={e => setStock(e.target.value)} />

      <label>Color</label>
      <input type="text" value={color} onChange={e => setColor(e.target.value)} />

      <label>Material</label>
      <input type="text" value={material} onChange={e => setMaterial(e.target.value)} />

      <label>Upload Images</label>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
