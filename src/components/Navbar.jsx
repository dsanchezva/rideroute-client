import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {
  const { isLoggedIn, authenticateUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem("authToken")

    authenticateUser()

    navigate("/");

  }


  if (isLoggedIn) {
    return (
      <nav>
          <NavLink to="/">Home</NavLink>
          <button onClick={handleLogout}>Logout</button>
      </nav>
    )

  } else {

    return (
      <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/signup">Register</NavLink>
          <NavLink to="/login">Access</NavLink>
      </nav>
    )


  }







 
}

export default Navbar