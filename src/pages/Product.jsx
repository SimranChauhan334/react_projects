

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "/src/components/Product.css";

const Product = () => {
  const [Productpage, setProductlist] = useState([]);
  const { id } = useParams();
  const [user, setUser] = useState(null)

 
  const getProduct = async () => {
    const url = `http://127.0.0.1:8000/api/product_by_subcategory/${id}/`;
    const response = await fetch(url);
    const data = await response.json(); 
    setProductlist(data); 
  };

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("token not found");
      return
    }

    const userRes = await fetch("http://localhost:8000/api/user/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (userRes.ok) {
      const userData = await userRes.json()
      setUser(userData);
    }

  }

  useEffect(() => {
    getProduct();
    fetchUserData();
  }, [id]);

  return (
    <div className="product-container">
      
      {user?.is_vendor && (

      <div className="add-product-button">
        <Link to={`/add-product/${id}`}>
          <button>Add Product</button>
        </Link>
      </div>
      )}

     
      {Productpage.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product_detail/${product.id}`}>
            <h2>{product.product_name}</h2>
          </Link>

         
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[0].image}  
              alt={product.product_name}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Product;
