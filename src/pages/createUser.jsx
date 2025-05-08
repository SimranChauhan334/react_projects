


import { useState } from "react";
import "/src/components/Forms.css";
import { useNavigate } from "react-router-dom"


function Createuser(){
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name , setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [is_vendor, setIsVendor] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    
    const formData = {
      username,
      first_name,
      last_name,
      email,
      password,
      profile:{
        phone_no,
        is_vendor,
      }
    }

    const token = localStorage.getItem('access_token');

    const response = await fetch('http://localhost:8000/api/usercreate/',{
      method : 'POST',
      headers:{
        'Content-Type' : 'application/json',
        // 'Authorization': `Bearer ${token}`


      },
      body : JSON.stringify(formData),
    })
    if (response.ok) {
      const result = await response.json();

      alert("user created successfully")
      navigate('/login')



      // setUsername('');
      // setFirstName('');
      // setLastName('');
      // setEmail('');
      // setPassword('');
      // setPhoneNo('');
      // setIsVendor(false);


    } else {
      const errorData = await response.json();
      console.error("Error",errorData)
      alert("Failed to create user. ")
      
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      
      <label>Username </label>
      <input
        type = 'text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      ></input>

      <label>First Name</label>
      <input
        type = "text"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      ></input>

      <label>Last Name</label>
      <input
        type="text"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      ></input>

      <label>Email </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>

      <label>Password </label>
      <input 
      type = 'password'
      value = {password}
      onChange={(e) => setPassword(e.target.value)}
      ></input>

     <label>Phone Number:</label>
      <input
        type="text"
        value={phone_no}
        onChange={(e) => setPhoneNo(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={is_vendor}
          onChange={(e) => setIsVendor(e.target.checked)}
        />
        Register as Vendor
      </label>

      <button type="submit">Submit</button>
    </form>
  )
    
}


export default Createuser

