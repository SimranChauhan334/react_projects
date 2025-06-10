


import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        setError("You must be logged in.")
        setLoading(false)
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    };

    fetchUser();
  }, [])
  const handleHistoryClick = () => {
    
    navigate("/order-history"); 
  };

  if (loading) return <p>Loading your profile...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Your Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>First Name:</strong> {user.first_name}</p>
      <p><strong>Last Name: </strong> {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong>{user.phone_no}</p>
      <p><strong>Staus:</strong> {user.is_vendor ? "Vendor" : "User"}</p>
      <button 
        onClick={handleHistoryClick} 
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        History
      </button>
      
    </div>
  )
}

export default Profile;
