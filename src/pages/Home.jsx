import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from '../context/theme.context';

function Home() {
const {isLoggedIn} = useContext(AuthContext)
const {darkTheme} = useContext(ThemeContext)



if (darkTheme) {
  return (
    <Link to={"/login"}>
        <img src="/images/letter.png" alt="rideroute-logo" className='logo-home' />
    </Link>
  )
} else {

  return (
    <Link to={"/login"}>
        <img src="/images/letter.png" alt="rideroute-logo" className='logo-home'/>
    </Link>
  )
}

}

export default Home