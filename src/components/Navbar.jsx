


import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { useEffect } from 'react';


function Navbar() {

  const logout = () => {
    
    localStorage.removeItem('access_token')
  }


  return (
    <nav className="navbar">
      <div className="logo">Clothing-Store</div>
      <div className="nav-links">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/createuser">Create user</Link>
        {
          localStorage.getItem('access_token')?
          <Link onClick={()=>logout()}>Logout</Link>:
          <Link to={'/login'}>Login</Link>
        }
      </div>
    </nav>
  );
}

export default Navbar;

