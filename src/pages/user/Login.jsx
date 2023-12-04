import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    try {
      const response = await service.post("/user/login", credentials);

      localStorage.setItem("authToken", response.data.authToken);
      await authenticateUser();
      navigate("/home");
    } catch (err) {
      console.log(err);
      if (err.respone && err.response.status === 400) {
        setErrorMessage(err.respone.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <br />
        <p>{errorMessage}</p>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
