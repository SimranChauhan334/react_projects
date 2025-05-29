

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("phone_pay");
  const [deliveryDate, setDeliveryDate] = useState("");

  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login to view your cart");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart items");
      const data = await res.json();

     
      setCartItems(data.results);
    } catch (error) {
      console.error(error);
      alert("Error loading cart items");
    }
  };
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      alert("login required")
    }
    if (!shippingAddress || !paymentMethod){
      alert("enter shipping address and payment method")
      return
    }
    const res = await fetch("http://127.0.0.1:8000/api/order/",{
      method : "POST",
      headers : {
        "content-type":"application/json",
         Authorization: `Bearer ${token}`,
      },
      body : JSON.stringify({
        shipping_address : shippingAddress,
        payment_method : paymentMethod,
        delivery_date : deliveryDate
      })
    })
    if (!res.ok) throw new Error("Failed to place order")
      const data = await res.json()
      alert("Order placed successfully")
      setCartItems([]);
  }

  // Remove cart 
  const handleRemove = async (cartItemId) => {
   
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Login required");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/cart/${cartItemId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Product removed from cart");
        fetchCartItems()
      } else {
        alert("Failed to remove product");
      }
    } catch (error) {
      console.error(error);
      alert("Error removing product");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => {
          // console.log("Cart item:", item); 

          
          const key = item.id ?? item.added_at;

          return (
            <li key={key} style={{ marginBottom: "20px" }}>
              <img
                src={
                  item.product.images && item.product.images.length > 0
                    ? item.product.images[0].image
                    : "fallback-image.jpg"
                }
                alt={item.product.product_name}
                style={{ width: "100px", height: "auto" }}
              />
              <p>Product: {item.product.product_name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.product.product_price}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <Link to={`/buy-now/${item.product.id}`}>
                  <button>Buy Now</button>
                </Link>
               
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </li>
          );
        })}
      </ul>
      <div style={{ marginTop: "40px" }}>
         <h3>Place Order for All Items</h3>
         <input
           type="text"
           placeholder="shipping_address"
           value={shippingAddress}
           onChange={(e) => setShippingAddress(e.target.value)}
           style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
         ></input>
         <br />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ padding: "8px", marginBottom: "10px" }}
          >
            <option value="phone_pay">Phone Pay</option>
            <option value="credit_card">Credit card</option>
            <option value="paytm">Paytm</option>
            <option value="bank_transfer">Bank Transfer</option>

          </select>
          <br/>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            style={{ padding: "8px", marginBottom: "10px" }}
          ></input>
          <br/>
          <button onClick={handlePlaceOrder} style={{ padding: "10px 20px" }}>
            Place Order
          </button>
      </div>
    </div>
  );
};

export default Cart;
