import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";
import { Button, Form, Input } from "antd";
import { ThemeContext } from "../../context/theme.context";

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { darkTheme } = useContext(ThemeContext);

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
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
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

  const styleHandler = {
    color: darkTheme ? "white" : "black",
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label={<label style={styleHandler}>Username</label>}
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </Form.Item>

        <Form.Item
          label={<label style={styleHandler}>Password</label>}
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Item>

        <p style={{ color: "red" }}>{errorMessage}</p>

        <Button type="primary" htmlType="submit" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
