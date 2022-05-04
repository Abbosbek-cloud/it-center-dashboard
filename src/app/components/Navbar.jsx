import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Navbar = (props) => {
  const [collapsed, setCllapsed] = useState(false);
  const toggle = () => {
    setCllapsed(!collapsed);
  };
  return (
    <div>
      <Layout id="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link style={{ textDecoration: "none" }} to="/">
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link style={{ textDecoration: "none" }} to="/groups">
                Groups
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <Link style={{ textDecoration: "none" }} to="/tutors">
                Tutors
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link style={{ textDecoration: "none" }} to="/students">
                Students
              </Link>
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
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Navbar;
