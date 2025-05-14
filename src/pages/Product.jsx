

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "/src/components/Product.css";

const Product = () => {
  const [Productpage, setProductlist] = useState([]);
  const { id } = useParams();

 
  const getProduct = async () => {
    const url = `http://127.0.0.1:8000/api/product_by_subcategory/${id}/`;
    const response = await fetch(url);
    setProductlist(await response.json());
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div className="product-container">
      
      <div className="add-product-button">
        <Link to={`/add-product/${id}`}>
          <button>Add Product</button>
        </Link>
      </div>

     
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
