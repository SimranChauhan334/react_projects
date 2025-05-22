import React, { useEffect, useState } from 'react';

import '/src/components/Orders.css';




const Order = () => {
  const [orders, setOrders] = useState({ results: [] })

  useEffect(() => {
    const fetchOrders = async () => {
      
        const res = await fetch("http://127.0.0.1:8000/api/order/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })

        if (!res.ok) {
          const errorText = await res.text()
          console.error("Server error:", errorText)
          throw new Error("Failed to fetch orders")
        }

        const data = await res.json()
        console.log("Fetched orders:", data)
        setOrders(data)
      
      
    };

    fetchOrders()
  }, [])

  return (
    <div className="order-details">
      <h2 className="logo-1">My Orders</h2>
      {orders.results.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="history">
          {orders.results.map((order, index) => (
            <li key={index} className="border">
             
              {order.product?.images?.length > 0 && (
                <img
                  src={order.product.images[0].image}
                  alt={order.product.product_name}
                  className="images"
                />
              )}
              <div>
                <h3 className="orders-detail">{order.product?.product_name}</h3>
                <p>Quantity: {order.quantity}</p>
                <p>Price: ₹{order.price}</p>
                <p>Delivery Date: {order.delivery_date}</p>
                <p>Status: {order.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Order;
