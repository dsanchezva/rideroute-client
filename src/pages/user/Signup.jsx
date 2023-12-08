import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { Button, Form, Input } from "antd";
import { ThemeContext } from "../../context/theme.context";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { darkTheme } = useContext(ThemeContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };

    try {
      await service.post("/user/signup", newUser);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

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
          label={<label style={styleHandler}>Email</label>}
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
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
        <Button type="primary" htmlType="submit" onClick={handleSignup}>
          Create
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
