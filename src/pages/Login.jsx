


// const login=() => {
//     return <h2>Login page</h2>;
//   }
// export default login;

import { useState } from "react";
import { useNavigate } from "react-router-dom"

  

function Login (){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const formData = {
      username,
      password,      
    }

    const response = await fetch('http://localhost:8000/api/token/', {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(formData),
    })

    if(response.ok) {
      const result = await response.json();
      const { access } = result;

      localStorage.setItem('access_token', access);
      alert("Login successful")
      navigate('/');

    } else {
      const errorData = await response.json();
      console.error("Error",errorData)
      alert("Failed to login. ")
    }

  }

  return (

    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      ></input>

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      ></input>

      <button type="Submit">Login</button>

    </form>
  )

  
}

export default Login
