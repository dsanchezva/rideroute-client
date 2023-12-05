import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";

function Navbar() {
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {toggleTheme, darkTheme} = useContext(ThemeContext)




  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };


  const handleLogout = () => {
    localStorage.removeItem("authToken");

    authenticateUser();

    navigate("/");
  };

  if (isLoggedIn) {
    return (
      <nav className="Navbar">
        <div>
        <NavLink to="/home"><img src="../../public/images/letter.png" alt="logo" /></NavLink> 
        </div>
        <div className="navbar-btn">
        <NavLink to="/home" style={toggleStyles}>Routes</NavLink>
        <NavLink to="/profile" style={toggleStyles}>Profile</NavLink>
        <button onClick={handleLogout}>Logout</button>
        <br />
        <NavLink to="/routeCreate" style={toggleStyles}>Crear ruta</NavLink>
        </div>
        <button onClick={toggleTheme}>Theme</button>
      </nav>
    );
  } else {
    return (
      <nav className="Navbar">
        <div className="navbar-btn">
        <NavLink to="/" style={toggleStyles}>Home</NavLink>
        <NavLink to="/signup" style={toggleStyles}>Register</NavLink>
        <NavLink to="/login" style={toggleStyles}>Access</NavLink>
        </div>
        <button onClick={toggleTheme}>Theme</button>
      </nav>
    );
  }
}

export default Navbar;
