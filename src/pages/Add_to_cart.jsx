

import React , { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// import '../components/cart.css'


const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [shippingAddress, setShippingAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("");
  const [showOrderform , setshowOrderform] = useState(false)

  const fetchCartItems = async () => {
    const token = localStorage.getItem("access_token")
    if(!token) {
      alert("login to view your cart")
      return
    }
    const res = await fetch("http://127.0.0.1:8000/api/cart/",{
      headers : {
        Authorization : `Bearer ${token}`,
      }
    })
    if (!res.ok) throw new Error("failed")
      const data = await res.json()
      setCartItems(data.results)
  }
  // Increase Quantity
  
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    const token = localStorage.getItem("access_token")
    if(!token) {
      alert("login first")
      return

    }
    const res = await fetch (`http://127.0.0.1:8000/api/cart/${cartItemId}/`,{
      method : "PATCH",
      headers : {
        "content-type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({ quantity : newQuantity}),
    })

    if (res.ok) {
      fetchCartItems()
    }else {
      alert("failed to update quantity")
    }
  }

  // place Order
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("access_token")
    if(!token) {
      alert("login required")
      return
    }
    if (!shippingAddress || !paymentMethod) {
      alert("Enter shipping address and payment method")
      return
    }
    const res = await fetch ("http://127.0.0.1:8000/api/order/",{
      method : "POST",
      headers : {
        "content-type" : "application/json",
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        shipping_address : shippingAddress,
        payment_method : paymentMethod,
        delivery_date : deliveryDate
      })
    })
    if (!res.ok) throw new Error("failed to place order")
    const data = await res.json()
    alert("Order placed successfully")
    setCartItems([])
    setshowOrderform(false)

  }
  // Remove Cart
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
  }, [])

  if (cartItems.length === 0) return <p>Your cart is empty.</p>
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
         
          <li key={item.id} style={{ marginBottom: "20px" }}>
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
            <p>Price: ₹{item.product.product_price}</p>

            <label>
              Quantity :
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}                
              ></input>
              <br />

              <Link to={`/buy-now/${item.product.id}`}>
                 <button>Buy Now</button>
              </Link>

              <button
              onClick={() => handleRemove(item.id)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>


            </label>
          </li>
        ))}
      </ul>

      {!showOrderform ? (
        <button onClick={() => setshowOrderform(true)}>Place Order</button>
      ) : (
        <div style={{ marginTop: "30px" }}>
          <h3>Order Details</h3>

          <input
            type="text"
            placeholder="Shipping Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment</option>
            <option value="phone_pay">PhonePay</option>
            <option value="paytm">Paytm</option>
            <option value="card">Card</option>
          </select>

          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
          <br />

          <button onClick={handlePlaceOrder}>Confirm Order</button>
          <button
            onClick={() => setshowOrderform(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )

}

export default Cart