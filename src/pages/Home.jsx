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

  const getCategory = async () => {
    let url = "http://127.0.0.1:8000/api/category/";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCategories(data.results || data); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {/* <h1 className="cat">Category</h1> */}
      <div className="category-container"> 
        {categories.map((category, index) => (
          <div className="category-item" key={category.id || index}>
            <div className="catname">
              <Link to={`/subcategory/${category.id}`}>
                <h2>{category.name}</h2>
              </Link>
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
