


import { useState, useEffect } from 'react';
import "/src/components/category.css";



function Createcategory() {
    const [cat_name, setCatName] = useState('');
    const [cat_image, setCatImage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', cat_name);
        formData.append('image', cat_image);

        const response = await fetch('http://localhost:8000/api/category/', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Category created successfully');
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
