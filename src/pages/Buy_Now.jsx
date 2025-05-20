

// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";

// const Buy_Now = () => {
//     return <>

//       <h1> product purchase</h1>
//     </>
// }

// export default Buy_Now

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BuyNowForm = () => {
  const { productId } = useParams();

  // console.log("Product ID:", productId); 
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [loading, setLoading] = useState(false);


  
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${productId}/`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    
    // console.log("Access Token:", token);

    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (!shippingAddress) {
      alert("Shipping address is required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: productId,
          quantity,
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          delivery_date: new Date().toISOString().split("T")[0], 
        }),
           
      });

      if (!res.ok) {
        const errorData = await res.json();
         
        alert(`Order failed: ${errorData.error || "Unknown error"}`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      alert("Order placed successfully!");
      navigate(`/login`);
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>

      <h2>Buy Now - {product.product_name}</h2>
      <p>Price: ₹{product.product_price}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </label>
        <br />

        <label>
          Shipping Address:
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit_card">Credit Card</option>
            <option value="phone_pay">Phone Pay</option>
            <option value="paytm">Paytm</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </label>
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default BuyNowForm;
