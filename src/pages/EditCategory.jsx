


import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "/src/components/category.css";

function EditCategory() {
    const [cat_name, setCatName] = useState('');
    const [cat_image, setCatImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const fetchCategory = async () => {
            const response = await fetch(`http://localhost:8000/api/category/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCatName(data.name);
                
            } else {
                alert("Failed to category data.");
            }
        };

        fetchCategory();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', cat_name);
        if (cat_image) {
            formData.append('image', cat_image);
        }

        const token = localStorage.getItem('access_token');

        const response = await fetch(`http://localhost:8000/api/category/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            navigate("/");
        } else {
            const errorData = await response.json();
            console.error(errorData);
            alert('Failed to update category.');
        }
    };

    return (
        <form onSubmit={handleUpdate} encType="multipart/form-data">
            <h2>Edit Category</h2>

            <label>Category Name</label>
            <input
                type="text"
                value={cat_name}
                onChange={(e) => setCatName(e.target.value)}
            />

            <label>Upload New Image (optional):</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setCatImage(e.target.files[0])}
            />

            <button type="submit">Update Category</button>
        </form>
    )
}

export default EditCategory;
