// const Home=()=>{
//     return <>
//         <h1>hello</h1>
//     </>
// }



// export default Home

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../components/category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null); 

  const getCategory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/category/");
      const data = await response.json();
      setCategories(data.results || data); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("No access token found in localStorage");
      return;
    }

    try {
      const userRes = await fetch("http://localhost:8000/api/user/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getCategory();
    fetchUserData();
  }, []);

  return (
    <>
      
      {user?.is_vendor && (
        <div className="add-category-button">
          <Link to="/createcategory">
            <button>Add Category</button>
          </Link>
        </div>
      )}

      <div className="category-container">
        {categories.map((category, index) => (
          <div className="category-item" key={category.id || index}>
            <div className="catname">
              <Link to={`/subcategory/${category.id}`}>
                <h2>{category.name}</h2>
              </Link>

             
              {user?.is_vendor && (
                <Link to={`/edit-category/${category.id}`}>
                  <button className="edit-button">Edit</button>
                  {/* <button>Edit</button> */}
                </Link>
              )}
            </div>

            <div className="catpic">
              <img
                src={category.image}
                alt={category.name}
                style={{ width: '200px', height: 'auto' }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
