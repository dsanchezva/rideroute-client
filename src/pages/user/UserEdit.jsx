import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";
import { Button, Divider, Form, Input } from "antd";
import { ThemeContext } from "../../context/theme.context";

function UserEdit() {
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailSelected] = useState("");
  const { loggedUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { darkTheme } = useContext(ThemeContext);

  const handleUsernameChange = (e) => setUsernameValue(e.target.value);
  const handleEmailChange = (e) => setEmailSelected(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.patch("/user/editUser", {
        username: usernameValue,
        email: emailValue,
      });
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
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
      <h1>User Edit</h1>
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
            value={usernameValue}
            onChange={handleUsernameChange}
          />
        </Form.Item>
        <Form.Item
          label={<label style={styleHandler}>Email</label>}
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            type="email"
            name="email"
            value={emailValue}
            onChange={handleEmailChange}
          />
        </Form.Item>
        <p style={{ color: "red" }}>{errorMessage}</p>

        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Edit profile
        </Button>
      </Form>
      <Divider />
    </div>
  );
}

export default UserEdit;
