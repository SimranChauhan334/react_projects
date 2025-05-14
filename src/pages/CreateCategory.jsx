


import { useState, useEffect } from 'react';
import "/src/components/category.css";
import { useNavigate } from "react-router-dom"



function Createcategory() {
    const [cat_name, setCatName] = useState('');
    const [cat_image, setCatImage] = useState('');
    // const [isVendor, setIsVendor] = useState(false);  //extra//
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', cat_name);
        formData.append('image', cat_image);

        const token = localStorage.getItem('access_token')

        if (!token) {
            alert("Please login first.");
            return;
        }

        const response = await fetch('http://localhost:8000/api/category/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            // alert('Category created successfully');
            navigate("/")
            setCatName('');
            setCatImage(null);
        } else {
            const errorData = await response.json();
            console.error(errorData);
            alert('Failed to create category.');
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2>Create Category</h2>

            <label>Category Name</label>
            <input
                type="text"
                value={cat_name}
                onChange={(e) => setCatName(e.target.value)}
            />

            <label>Upload Image:</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setCatImage(e.target.files[0])}
            />

            <button type="submit">Add Category</button>
        </form>
    );
}

export default Createcategory;

