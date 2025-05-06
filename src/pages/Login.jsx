

import { useState } from "react";

// const login=() => {
//     return <h2>Login page</h2>;
//   }
// export default login;
  

function Login (){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  const handleSubmit = async(e)=>{
    e.preventDefault(e)

    const formData = {
      username,
      password,
    }

  }
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Login</h2>
      
    </form>
  )

}

export default Login