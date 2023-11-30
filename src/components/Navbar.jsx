import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Register</NavLink>
        <NavLink to="/login">Access</NavLink>
    </nav>
  )
}

export default Navbar