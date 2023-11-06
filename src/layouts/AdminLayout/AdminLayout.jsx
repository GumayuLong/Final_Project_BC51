import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import "./adminLayout.scss";

const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout() {
  const userState = useSelector((state) => state.userReducer);

  const renderContent = () => {
    // if (userState.userInfo) {
    return (
      <div
        className="d-flex align-items-center justify-content-end"
        style={{ borderBottom: "1px solid #343a40", height: 50 }}
      >
        <span className="text-dark">Hello {userState.userInfo.name}</span>
        <button
          // onClick={handleLogout}
          className="ml-3 btn btn-warning"
        >
          LOGOUT
        </button>
        <button
          // onClick={handleBack}
          className="mx-3 btn "
        >
          <FontAwesomeIcon icon={faRightToBracket} className="text-dark" />
        </button>
      </div>
    );
    // }
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin/user">Người dùng</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to="#">Thông tin vị trí</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <Link to="#">Thông tin phòng</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to="#">Quản lý đặt phòng</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {renderContent()}
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
