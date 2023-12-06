import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { Button, Image, Layout, Menu, Switch } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  NodeIndexOutlined,
  BulbOutlined,
  BulbTwoTone,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";

import logoPic from "/images/letter.png";

function Navbar() {
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toggleTheme, darkTheme } = useContext(ThemeContext);

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };
  let activeStyles = {};
  let inActiveStyles = {};
  if (darkTheme) {
    activeStyles = {
      textDecoration: "underline",
      color: "white",
      backgroundColor: "black",
    };

    inActiveStyles = {
      textDecoration: "none",
      color: "Black",
      backgroundColor: "grey",
    };
  } else {
    activeStyles = {
      textDecoration: "underline",
      color: "orange",
      backgroundColor: "grey",
    };

    inActiveStyles = {
      textDecoration: "none",
      color: "Black",
      backgroundColor: "white",
    };
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    authenticateUser();

    navigate("/");
  };

  const styleLogo = {
    float: "left",
    width: "220px",
    height: "31px",
    margin: "16px 24px 16px 0",
  };

  const styleHeader = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
  };

  if (isLoggedIn) {
    return (
      <Layout>
        <Header style={styleHeader}>
          <nav className="Navbar">
            <div style={styleLogo}>
              <a href="/home">
                <img src={logoPic} alt="logo" />
              </a>
            </div>
            <Menu
              theme={darkTheme ? "dark" : "light"}
              mode="horizontal"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <NavLink to="/home">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <NavLink to="/profile">Profile</NavLink>
              </Menu.Item>
              <br />
              <Menu.Item key="3" icon={<NodeIndexOutlined />}>
                <NavLink to="/routeCreate">Create route</NavLink>
              </Menu.Item>
            </Menu>
            <Menu theme={darkTheme ? "dark" : "light"} mode="horizontal">
              <Menu.Item key="4">
                <Button onClick={handleLogout} icon={<LogoutOutlined />}>
                  Logout
                </Button>
              </Menu.Item>
              <Menu.Item key="5" disabled={true}>
                <Switch onClick={toggleTheme} />
                {darkTheme ? <BulbOutlined /> : <BulbTwoTone />}
              </Menu.Item>
            </Menu>
          </nav>
        </Header>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Header style={styleHeader}>
          <nav className="Navbar">
            <div style={styleLogo}>
              <a href="/">
                <img src={logoPic} alt="logo" />
              </a>
            </div>
            <Menu
              theme={darkTheme ? "dark" : "light"}
              mode="horizontal"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <NavLink to="/">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>
              <Menu.Item key="3" icon={<UserAddOutlined />}>
                <NavLink to="/signup">Register</NavLink>
              </Menu.Item>

              <Menu.Item disabled={true}>
                <Switch onClick={toggleTheme} />
                {darkTheme ? <BulbOutlined /> : <BulbTwoTone />}
              </Menu.Item>
            </Menu>
          </nav>
        </Header>
      </Layout>
    );
  }
}

export default Navbar;
