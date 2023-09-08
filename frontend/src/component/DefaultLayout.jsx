import React, { useState } from "react";
import "../css/antd.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../redux/slices/userApiSlice";

import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { message } from "antd";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutAPI, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      const res = await logoutAPI().unwrap();
      // console.log(res);
      message.success(res.message);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || error.error);
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
              className="boxshadow"
            >
              <div
                className="d-flex justify-content-between align-items-center boxshadow"
                style={{
                  boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
                }}
              >
                <h4>
                  {userInfo ? (
                    <Link
                      to={`/profile/${userInfo._id}`}
                      style={{ textDecoration: "none", margin: "5px 20px" }}
                    >
                      <UserOutlined />
                      <span className="mx-2 ">{userInfo.username}</span>
                    </Link>
                  ) : (
                    "Temp User"
                  )}
                </h4>
                <Link to="/" style={{ textDecoration: "none" }}>
                  {" "}
                  <h2 className="text-dark">Connect Zone</h2>
                </Link>

                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "20px",
                    width: 64,
                    height: 64,
                  }}
                />
              </div>
            </Header>
            <br />
            <Content
              style={{
                minHeight: "85vh",
                background: colorBgContainer,
              }}
              className="d-flex justify-content-center"
            >
              {children}
            </Content>
          </Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["/"]}
              selectedKeys={window.location.pathname}
              items={[
                {
                  key: "/",
                  icon: <HomeOutlined />,
                  label: <Link to="/"> Home</Link>,
                },
                {
                  key: `/profile/${userInfo._id}`,
                  icon: <UserOutlined />,
                  label: <Link to={`/profile/${userInfo._id}`}> Profile</Link>,
                },
                {
                  key: "/addpost",
                  icon: <UploadOutlined />,
                  label: <Link to="/addpost"> Add Post</Link>,
                },
                {
                  key: "/alluser",
                  icon: <OrderedListOutlined />,
                  label: <Link to="/alluser"> All User</Link>,
                },
                {
                  key: "/logout",
                  icon: <LogoutOutlined />,
                  label: "Logout",
                  onClick: handleLogout,
                },
              ]}
            />
          </Sider>
        </Layout>
      )}
    </>
  );
};
export default DefaultLayout;
