import { notification } from "antd";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminGuard(props) {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer.userInfo);

  useEffect(() => {
    if (!userState) {
      notification.warning({
        message: "Vui lòng đăng nhập!",
        placement: "bottomRight",
      });

      navigate("/login");
    } else {
      if (userState.user.role !== "ADMIN") {
        notification.warning({
          message: "Bạn không có quyền truy cập!",
          placement: "bottomRight",
        });
        navigate("/");
      }
    }
  }, []);

  return <div>{props.children}</div>;
}
