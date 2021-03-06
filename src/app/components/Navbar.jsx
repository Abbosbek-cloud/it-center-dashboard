import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BookOutlined,
  FolderOpenOutlined,
  LeftSquareOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Navbar = (props) => {
  const [collapsed, setCllapsed] = useState(false);
  useEffect(() => {
    if (isAdmin === null || undefined) {
      navigate("/login");
    }
    console.log(isAdmin);
  }, []);
  const navigate = useNavigate();
  const toggle = () => {
    setCllapsed(!collapsed);
  };

  const isAdmin = localStorage.getItem("isAdminAuthenticated");

  const exit = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div>
      <Layout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[`1`]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <span>Dashboard</span>
              <Link to="dashboard" />
            </Menu.Item>
            <Menu.Item key="3" icon={<FolderOpenOutlined />}>
              <span>Kurslar</span>
              <Link to="tutors" />
            </Menu.Item>
            <Menu.Item key="4" icon={<BookOutlined />}>
              <span>Kutubxona</span>
              <Link to="library" />
            </Menu.Item>
            <Menu.Item key="5" onClick={exit} icon={<LeftSquareOutlined />}>
              <span>Chiqish</span>
              <Link to="/" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              overflow: "scroll",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Navbar;
