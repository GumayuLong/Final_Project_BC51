import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/styling.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoAction } from "../../store/actions/userAction";

const { Header } = Layout;

export default function HeaderHome() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const renderContent = () => {
    if (!userState.userInfo) {
      return (
        <>
          <button
            className="btn-custom-1 mr-2"
            onClick={() => navigate("/login")}
          >
            SIGN IN
          </button>

          <button
            className="btn-custom-2"
            onClick={() => navigate("/register")}
          >
            REGISTER
          </button>
        </>
      );
    } else if (useState.userInfo) {
      <>
        <span className="state">Hello {userState.userInfo.hoTen}</span>
        <button onClick={handleLogout} className=" ml-2 btn btn-login">
          LOGOUT
        </button>
      </>;

      if (useState.userInfo.role === "ADMIN") {
        <button className="btn-icon mr-2" onClick={() => navigate("/login")}>
          SIGN IN
        </button>;
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="d-flex align-items-center justify-content-between">
          <div className="demo-logo mr-5">
            <h3 style={{ color: "rgba(0, 0, 0, 0.65)" }}>
              Cyber <span style={{ color: "#EF4444" }}> Booking</span>
            </h3>
          </div>
          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/position">Thông tin vị trí</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/admin/department">Thông tin phòng</Link>
            </Menu.Item>
            <Menu.Item disabled key="4">
              <Link to="#">Quản lý đặt phòng</Link>
            </Menu.Item>
          </Menu> */}

          <div>{renderContent()}</div>
        </div>
      </Header>
    </Layout>
  );
}
