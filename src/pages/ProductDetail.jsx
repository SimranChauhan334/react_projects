


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../components/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');

  const fetchProduct = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
    const data = await res.json();
    setProduct(data);
    setMainImage(data.images[0]?.image);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl); 
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-image-section">
       
        <div className="main-image-container">
          {mainImage && (
            <img
              src={mainImage}
              alt="Main Product"
              className="main-image"
            />
          )}
        </div>

        
        <div className="thumbnail-container">
          {product.images && product.images.map((img) => (
            img.image !== mainImage && (  
              <img
                key={img.id}
                src={img.image}
                alt={`Thumbnail of ${product.product_name}`}
                className="thumbnail"
                onClick={() => handleThumbnailClick(img.image)}
              />
            )
          ))}
        </div>
      </div>

      <div className="product-details-section">
        <h1>{product.product_name}</h1>
        <p className="product-description">{product.product_description}</p>
        <p className="product-price">Price: ₹{product.product_price}</p>
        <p>Color: {product.color}</p>
        <p>Material: {product.material}</p>
        <p className="product-stock">Stock: {product.stock}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
