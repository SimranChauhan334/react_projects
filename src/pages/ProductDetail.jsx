

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import "../components/ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isInCart, setIsInCart] = useState(false)
  const [showQuantitySelector, setShowQuantitySelector] = useState(false)
  const [reviews, setReviews] = useState([])
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(1);
  

  // const [addreviews, setaddreviews] = useState()

  const fetchProduct = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`)
    const data = await res.json()
    setProduct(data);
    setMainImage(data.images[0]?.image)
  };

  const fetchReviews = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/product/${id}/reviews/`)
    const data = await res.json()
    setReviews(data)
  }


  const checkIfInCart = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return

    const res = await fetch("http://127.0.0.1:8000/api/cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json()
      const exists = data.results.some(
        (item) => item.product && product && item.product.id === product.id
      );
      setIsInCart(exists);
    } else {
      console.error("Cart check failed:", await res.text());
    }
  }


  useEffect(() => {
    fetchProduct()
    fetchReviews()
  }, [id]);

  useEffect(() => {
    if (product) {
      checkIfInCart()
    }
  }, [product])

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      alert("You must be logged in")
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/api/cart/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: product.id,
        quantity: quantity || 1,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product added to cart");
      setIsInCart(true);
      setShowQuantitySelector(false);
    } else {
      alert(data.detail || "Failed to add to cart.");
    }
  }

  const handleAddReview = async () => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      alert("you must be login")
      return
    }
    const res = await fetch(`http://127.0.0.1:8000/api/product/${id}/reviews/`,{
      method : "POST",
      headers : {
        "content-type" : "application/json",
        Authorization : `Bearer ${token}`,
      },
      body : JSON.stringify({
        product: id, 
        review_text: reviewText,
        rating : reviewRating,
      })
    })

    if (res.ok) {
      alert("review submitted")
      setShowReviewForm(false)
      setReviewText()
      setReviewRating(1)
    }else{
      const errorData = await res.json()
      alert(errorData.detail || "review not submitted");
      
    }
  }

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <div className="product-detail-container">
        <div className="product-image-section">
          <div className="main-image-container">
            {mainImage && (
              <img src={mainImage} alt="Main Product" className="main-image" />
            )}
          </div>

          <div className="thumbnail-container">
            {product.images &&
              product.images
                .filter((img) => img.image !== mainImage)
                .map((img, index) => (
                  <img
                    key={img.id || `${img.image}-${index}`}
                    src={img.image}
                    alt={`Thumbnail of ${product.product_name}`}
                    className="thumbnail"
                    onClick={() => handleThumbnailClick(img.image)}
                  />
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
            <p className="out-of-stock">Product is out of stock</p>
          ) : (
            <div className="add-to-cart-section">
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
                    className="quantity-select"
                  >
                    {[...Array(product.stock).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleAddToCart}>Confirm Add to Cart</button>
                </>
              ) : (
                <button onClick={() => setShowQuantitySelector(true)}>
                  Add to Cart
                </button>
              )}

              <Link to={`/buy-now/${product.id}`}>
                <button className="buy-now">Buy Now</button>
              </Link>
              
            </div>
          )}
        </div>
      </div>

      
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="reviews-list">
            {reviews.map((review, index) => (
              <li key={review.id || `review-${index}`} className="review-item">
                <strong className="review-username">
                  {review.user?.username || "username"}
                </strong>
                
                <p className="review-text">{review.review_text}</p>
                <p className="review-rating">Rating: {review.rating} </p>
              </li>
            ))}
            
          </ul>
          
        )}

        <button className="add-reviews" onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? "Cancel" : "Add Review"}
        </button>
        
        {showReviewForm && (
          <div className="review-form">
            <textarea
              placeholder="Write your review...."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              raws = "4"
              cols="50"
            />
            <br />

            <label>Rating:</label>
            <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
              {[1,2,3,4,5].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <br />

            <button onClick={handleAddReview}>Submit Review</button>
            
            


          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
