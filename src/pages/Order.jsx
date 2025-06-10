// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';


// import '/src/components/Orders.css';




// const Order = () => {
//   const [orders, setOrders] = useState({ results: [] })
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchOrders = async () => {
      
//         const res = await fetch("http://127.0.0.1:8000/api/order/", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         })

//         if (!res.ok) {
//           const errorText = await res.text()
//           console.error("Server error:", errorText)
//           throw new Error("Failed to fetch orders")
//         }

//         const data = await res.json()
//         console.log("Fetched orders:", data)
//         setOrders(data)
      
      
//     };

//     fetchOrders()
//   }, [])

//   // const cancelorder = async (orderId) => {
//   //   const res = await fetch(`http://127.0.0.1:8000/api/cancel-order/${orderId}/`,{
//   //     method : "DELETE",
//   //     headers : {
//   //       "Content-Type": "application/json",
//   //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//   //     }
//   //   })

//   //   if (!res.ok) {
//   //     const errorText = await res.text()
//   //     console.error("Failed to cancel order:", errorText)
//   //     alert('Failed to cancel order')
//   //     return
//   //   }
//   //   const data = await res.json();
//   //   console.log("Success:", data.detail);  //
//   //   alert('alert cancel successfully')
    
//   // }
//   const cancelorder = async (orderId) => {
//   try {
//     const res = await fetch(`http://127.0.0.1:8000/api/cancel-order/${orderId}/`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error("Failed to cancel order:", errorText);
//       alert('Failed to cancel order');
//       return;
//     }

//     const data = await res.json();
//     console.log("Success:", data.detail);
//     alert('Order cancelled successfully');

//     // ✅ Update the state if needed (assuming you use useState for orders)
//     setOrders(prev =>
//       prev.map(order =>
//         order.id === orderId ? { ...order, is_cancelled: true } : order
//       )
//     );
//   } catch (error) {
//     console.error("Error cancelling order:", error);
//     alert('Something went wrong');
//   }
// };

  
//   return (
//     <div className="order-details">
//       <h2 className="logo-1">My Orders</h2>
//       {orders.results.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <ul className="history">
//           {orders.results.map((order, index) => (
//             <li key={index} className="border">
             
//               {order.product?.images?.length > 0 && (
//                 <img
//                   src={order.product.images[0].image}
//                   alt={order.product.product_name}
//                   className="images"
//                 />
//               )}
//               <div>
//                 <h3 className="orders-detail">{order.product?.product_name}</h3>
//                 <p>Quantity: {order.quantity}</p>
//                 <p>Price: ₹{order.price}</p>
//                 <p>Delivery Date: {order.delivery_date}</p>
//                 <p>Status: {order.status}</p>

//                 {order.status !== "Cancelled" && (
//                   <button
//                     className="cancel-button"
//                     onClick={() => cancelorder(order.id)}

//                   >
//                     Cancel Order
//                   </button>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Order


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '/src/components/Orders.css';

const Order = () => {
  const [orders, setOrders] = useState({ results: [] });
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/order/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server error:", errorText);
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        console.log("Fetched orders:", data);
        setOrders(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchOrders();
  }, [])

  const isDelivered = (dateStr) => {
    if (!dateStr) return false;
    const orderDate = new Date(dateStr);
    const now = new Date();
    const diffTime = now - orderDate
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays >= 2;
  };


  const cancelorder = async (orderId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/cancel-order/${orderId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to cancel order:", errorText);
        alert('Failed to cancel order');
        return;
      }

      const data = await res.json();
      console.log("Success:", data.detail);
      alert('Order cancelled successfully');

     
      setOrders(prev => ({
        ...prev,
        results: prev.results.map(order =>
          order.id === orderId ? { ...order, status: "Cancelled" } : order
        )
      }));

    } catch (error) {
      console.error("Error cancelling order:", error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="order-details">
      <h2 className="logo-1">My Orders</h2>
      {orders.results.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="history">
          {orders.results.map((order, index) => {
            
            const normalizedStatus = order.status?.trim().toLowerCase()
            const delivered = isDelivered(order.delivery_date);

            
            const displayStatus = normalizedStatus === "cancelled"
              ? "Cancelled"
              : delivered
              ? "Delivered"
              : order.status

            return (
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
                  {normalizedStatus !== "cancelled" && (
                    <button
                      className="cancel-button"
                      onClick={() => cancelorder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Order;
