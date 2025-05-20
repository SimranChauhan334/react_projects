


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
        <Link to="/profile">Profile</Link>
        {/* <Link to="createcategory">create category</Link> */}
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


// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css'; 
// import { useEffect, useState } from 'react';

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem('access_token');
//     setIsLoggedIn(false);
//     navigate('/login');

//     // Notify other components (optional)
//     window.dispatchEvent(new Event('authChange'));
//   };

//   useEffect(() => {
//     const checkAuth = () => {
//       setIsLoggedIn(!!localStorage.getItem('access_token'));
//     };

//     // Listen for manual login/logout changes
//     window.addEventListener('authChange', checkAuth);

//     return () => {
//       window.removeEventListener('authChange', checkAuth);
//     };
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="logo">Clothing-Store</div>
//       <div className="nav-links">
//         <div className="search-bar">
//           <input type="text" placeholder="Search..." />
//         </div>
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/createuser">Create user</Link>
//         {
//           isLoggedIn ?
//           <Link onClick={logout}>Logout</Link> :
//           <Link to="/login">Login</Link>
//         }
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
