import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import service from '../../services/config'



function Signup() {
    const navigate = useNavigate()

    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [errorMessage, setErrorMessage ] = useState("")

    const handleUsername = (e) => setUsername(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);


    const handleSignup = async (e) => {
        e.preventDefault();
        const newUser = {
            username,
            email,
            password
        }
    
        try {
            await service.post("/user/signup", newUser);
            navigate("/login");
        }catch (err) {
            console.log(err)
            if(err.respone && err.response.status === 400) {
                setErrorMessage(err.respone.data.errorMessage)
            } else {
                navigate("/error");
            }
        }
    }





  return (
    <div>
        <form onSubmit={handleSignup}>
            <label  htmlFor="username">Username: </label>
            <input type="text" name='username' value={username} onChange={handleUsername}/>
            <br />
            <label htmlFor="email">Email: </label>
            <input type="email" name='email' value={email} onChange={handleEmail}/>
            <br />
            <label htmlFor="password">Password: </label>
            <input type="password" name='password' value={password} onChange={handlePassword}/>
            <br />
            <p>{errorMessage}</p>
            <br />
            <button type='submit'>Create</button>
        
        </form>
    </div>
  )
}

export default Signup