

// const Add_to_cart = () =>{
//     return <>
//       <h1>cart items</h1>
//     </>
    
// }
// export default Add_to_cart

// import React, { useEffect, useState } from "react";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([])

//   const fetchCartItems = async () =>{
//     const token = localStorage.getItem("access_token")

//     if (!token) {
//       alert("login to view cart")
//       return
//     }
//     const res = await fetch ("http://127.0.0.1:8000/api/cart/",{
//       headers:{
//         "Authorization": `Bearer ${token}`,
//       }
//     })
//     if (!res.ok) throw new Error("Failed to cart items")
//       const data = await res.json()
//       // console.log("Cart API response data:", data); 
//     setCartItems(data.results)

//   }
//   useEffect(() => {
//     fetchCartItems()
//   },[])

//   if (cartItems.length === 0) return <p>Your cart is empty.</p>

//   return(
//     <div>
//       <h2>your cart</h2>

//       <ul>

//         {cartItems.map(item => (
//             <li key={item.added_at}>
//               <img 
//                 src={item.product.images.length > 0 ? item.product.images[0].image : "fallback-image.jpg"} 
//                 alt={`Product ${item.product.product_name}`} 
//                 style={{ width: "100px", height: "auto" }} 
//               />
//               <p>Product: {item.product.product_name}</p>
//               <p>Quantity: {item.quantity}</p>
//               <p>Price: ₹{item.product.product_price}</p>
//             </li>
//           ))}

//         {/* {cartItems.map(item => {
//           console.log("Product object:", item.product);
         
//           <li key = {item.added_at}>
//             <img 
//             src={item.product.images.length > 0 ? item.product.images[0].image : "fallback-image.jpg"}
//             alt={`Product ${item.product.id}`} 
//             style={{ width: "100px", height: "auto" }} 
//           />
//             <p>Product: {item.product.product_name}</p>
//             <p>Quantity: {item.quantity}</p>
//             <p>Price: ₹{item.product.product_price}</p>
//           </li>
// })} */}
//       </ul>
//     </div>
//   )
// }

// export default Cart


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
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

  // Remove cart 
  const handleRemove = async (cartItemId) => {
    console.log("Removing item with id:", cartItemId);
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
    </div>
  );
};

export default Cart;
