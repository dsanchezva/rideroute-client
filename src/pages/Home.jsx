import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Link, useNavigate } from "react-router-dom";

function Home() {
const {isLoggedIn} = useContext(AuthContext)





  return (
    <Link to={"/login"}>
        <img src="../../public/images/black.png" alt="rideroute-logo" />
    </Link>
  )
}

export default Home