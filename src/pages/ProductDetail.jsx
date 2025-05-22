
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import '../components/ProductDetail.css';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState('');
//   const [cartItem, setCartItem] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [showQuantitySelector, setShowQuantitySelector] = useState(false);

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

//   const handleAddToCart = async () => {
//     // console.log("Add to cart:", product.id);
//     const token = localStorage.getItem("access_token")

//     if(!token){
//       alert("you must be login ")
//       return
//     }
//     const res = await fetch("http://127.0.0.1:8000/api/cart/",{
//       method : "POST",
//       headers : {
//         "Content-Type": "application/json",
//          Authorization: `Bearer ${token}`,
//       },
//       body : JSON.stringify({
//         product: product.id,
//         quantity: quantity || 1,
//       })

//     })
//     const data = await res.json(); 
//     if (res.ok){
//       alert("Product added to cart!")
//       setCartItem(data)
//       setShowQuantitySelector(false)

//     }else{
//       alert(data.detail || "Failed to add to cart.");
//       // console.error("Add to cart error:", data);
//     }
   
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
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  const fetchProduct = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
    const data = await res.json();
    setProduct(data);
    setMainImage(data.images[0]?.image);
  };

  const checkIfInCart = async (productId) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const res = await fetch("http://127.0.0.1:8000/api/cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      // console.log("Cart Items:", data)
      const exists = data.results.some(item => item.product.id === productId);
      

      setIsInCart(exists);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      checkIfInCart(product.id);
    }
  }, [product]);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/api/cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: product.id,
        quantity: quantity || 1,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product added to cart!");
      setIsInCart(true)
      setShowQuantitySelector(false);
    } else {
      alert(data.detail || "Failed to add to cart.");
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
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {isInCart ? (
              <Link to="/cart-details">
                <button>View Cart</button>
              </Link>
            ) : showQuantitySelector ? (
              <>
                <label htmlFor="quantity">Select Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{ width: '100px' }}
                >
                  {[...Array(product.stock).keys()].map(i => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <button onClick={handleAddToCart}>Confirm Add to Cart</button>
              </>
            ) : (
              <button onClick={() => setShowQuantitySelector(true)}>Add to Cart</button>
            )}

            <Link to={`/buy-now/${product.id}`}>
              <button className="buy-now">Buy Now</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
