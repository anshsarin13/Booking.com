import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({user}) => {
  const navigate = useNavigate()


  // const token = localStorage.getItem('access_token');
  const handleLogout = () => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log('User Data Found:', userData);
  
    // Clear user data from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  
    // Redirect the user to the home page
    navigate('/login');
  };
  


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">anshbooking</span>
        </Link>
        
         { user ? (
          <>
        <span>Welcome, {user.username}!</span>
        <button onClick={ handleLogout} className="navButton">Logout</button>
          </>

      ) : (<div className="navItems">
            <Link to="/register">
            <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
            <button className="navButton">Login</button>
            </Link>

          </div>)}
        
      </div>
    </div>
  );
};

export default Navbar;