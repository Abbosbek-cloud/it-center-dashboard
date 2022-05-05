import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[`1`]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <span>Dashboard</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <span>Groups</span>
              <Link to="/groups" />
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <span>Tutors</span>
              <Link to="/tutors" />
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <span>Students</span>
              <Link to="/students" />
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
