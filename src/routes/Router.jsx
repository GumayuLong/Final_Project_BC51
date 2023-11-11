import React from "react";
import { useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import RoomDetail from "../pages/RoomDetail/RoomDetail";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "detail/:id",
          element: <RoomDetail />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/personal-info/:userId",
          element: <PersonalInfo />,
        },
      ],
    },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/user",
          element: <UserManagement />,
        },
        {
          path: "/admin/user/create",
          element: <CreateUser />,
        },
        {
          path: "/admin/user/edit/:userId",
          element: <EditUser />,
        },
        {
          path: "/admin/department",
          element: <DepartmentManagement />,
        },
        {
          path: "/admin/department/create",
          element: <CreateDepartment />,
        },
        {
          path: "/admin/position",
          element: <PositionManagement />,
        },
        {
          path: "/admin/position/create",
          element: <CreatePosition />,
        },
      ],
    },
  ]);

  return routing;
}
