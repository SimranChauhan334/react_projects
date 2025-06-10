

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
    const [product_name, setProductName] = useState('')
    const [product_price, setProductPrice] = useState('')
    const [product_description, setProductDescription] = useState('')
    const [color, setColor] = useState('')
    const [material, setMaterial] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [newImages, setNewImages] = useState([])


    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        const fetchProduct = async () => {
            
            const response = await fetch(`http://localhost:8000/api/products/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProductName(data.product_name);
                setProductPrice(data.product_price);
                setProductDescription(data.product_description);
                setColor(data.color);
                setMaterial(data.material);
                setStock(data.stock)
                setCategory(data.category)
                setSubcategory(data.subcategory)
                setCategory(data.category);
                setSubcategory(data.subcategory)

            } else {
                console.error("Failed to fetch product");
            
        } 
        };

        fetchProduct();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("access_token")

        const updatedProduct = {
            product_name,
            product_price,
            product_description,
            color,
            material,
            stock,
            category,
            subcategory,
        }
        const response = await fetch (`http://localhost:8000/api/products/${id}/`,{
            method : 'PUT',
            headers : {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(updatedProduct)
        })

        if (response.ok) {
            alert("Product updated successfully!")
            navigate("/")
        }else{
            const errorData = await response.json();
            console.error('Update failed:', errorData);
            alert("Failed to update product")
        }
    }
    return(
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>

        <label>
          Product Name:
          <input
            type="text"
            value={product_name}
            onChange={e => setProductName(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Product Price:
          <input
            type="number"
            value={product_price}
            onChange={e => setProductPrice(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Product Description:
          <textarea
            value={product_description}
            onChange={e => setProductDescription(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Color:
          <input
            type="text"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </label>
        <br />

        <label>
          Material:
          <input
            type="text"
            value={material}
            onChange={e => setMaterial(e.target.value)}
          />
        </label>
        <br />

        <label>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={e => setStock(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
         category:    
        <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
        />
    </label>
    <br />

    <label>
        subcategory:
        <input
            type="text"
            value={subcategory}
            onChange={e => setSubcategory(e.target.value)}
            required
        />
    </label>
    

        <button type="submit">Update Product</button>
      </form>
        </div>
    )
  
}
export default EditProduct