
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import '../components/ProductDetail.css';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState('');
//   const [cartItem, setCartItem] = useState(null);
//   const [quantity, setQuantity] = useState('');

//   const [user, setUser] = useState(null);

//   const fetchProduct = async () => {
//     const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
//     const data = await res.json();
//     setProduct(data);
//     setMainImage(data.images[0]?.image);
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const handleThumbnailClick = (imageUrl) => {
//     setMainImage(imageUrl);
//   };

//   const handleAddToCart = () => {
//     console.log("Add to cart:", product.id);
   
//   };

  

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="product-detail-container">
//       <div className="product-image-section">
//         <div className="main-image-container">
//           {mainImage && (
//             <img
//               src={mainImage}
//               alt="Main Product"
//               className="main-image"
//             />
//           )}
//         </div>

//         <div className="thumbnail-container">
//           {product.images && product.images.map((img) => (
//             img.image !== mainImage && (
//               <img
//                 key={img.id}
//                 src={img.image}
//                 alt={`Thumbnail of ${product.product_name}`}
//                 className="thumbnail"
//                 onClick={() => handleThumbnailClick(img.image)}
//               />
//             )
//           ))}
//         </div>
//       </div>

//       <div className="product-details-section">
//         <h1>{product.product_name}</h1>
//         <p className="product-description">{product.product_description}</p>
//         <p className="product-price">Price: ₹{product.product_price}</p>
//         <p>Color: {product.color}</p>
//         <p>Material: {product.material}</p>
//         <p className="product-stock">Stock: {product.stock}</p>
        
//         {/* {product.stock==0 && (
//            <p style={{ color: 'red', fontWeight: 'bold' }}>Product is out of stock</p>
//         )}
//          */}

//         {product.stock === 0 ? (
//           <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
//             Product is out of stock
//           </p>
//         ) : (
//           <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//             <button onClick={handleAddToCart}>Add to Cart</button>
//             <Link to={`/buy-now/${product.id}`}>
//               <button className="buy-now">Buy now</button>
//             </Link>
//           </div>
//         )}

        
//         {/* <div style={{ display: "flex", gap: "10px" }}>
//           <button onClick={handleAddToCart}>Add to Cart</button> */}
//           {/* <button onClick={handleOrderNow}>Buy Now */}
//             {/* <Link to={`/buy-now/${product.id}`}> */}
//               {/* <button className="buy-now">Buy now</button> */}
//             {/* </Link> */}
            
//           {/* </button> */}
//         {/* </div> */}
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import '../components/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [cartItem, setCartItem] = useState(null);

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

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("access_token");

      console.log(token)
      const res = await fetch("http://127.0.0.1:8000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({

          product: product.id,
          quantity: 1,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Added to cart:", data);
        setCartItem(data);
      } else {
        console.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

      
        {product.stock === 0 ? (
          <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
            Product is out of stock
          </p>
        ) : (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {cartItem ? (
              <Link to="/cart">
                <button>View Cart</button>
              </Link>
            ) : (
              <button onClick={handleAddToCart}>Add to Cart</button>
            )}
            <Link to={`/buy-now/${product.id}`}>
              <button className="buy-now">Buy now</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
