import React from "react";
import { useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import RoomDetail from "../pages/RoomDetail/RoomDetail";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import UserManagement from "../pages/UserManagement/UserManagement";
import CreateUser from "../pages/UserManagement/CreateUser/CreateUser";
import EditUser from "../pages/UserManagement/EditUser/EditUser";
import DepartmentManagement from "../pages/DepartmentManagement/DepartmentManagement";
import PositionManagement from "../pages/PositionManagement/PositionManagement";
import CreatePosition from "../pages/PositionManagement/CreatePosition/CreatePosition";
import CreateDepartment from "../pages/DepartmentManagement/CreateDepartment/CreateDepartment";
import PersonalInfo from "../pages/Personalinfo/PersonalInfo";
import ListRoomByLocate from "../pages/ListRoomByLocate/ListRoomByLocate";
import EditDepartment from "../pages/DepartmentManagement/EditDepartment/EditDepartment";
import EditPosition from "../pages/PositionManagement/EditPosition/EditPosition";
import BookedManagement from "../pages/BookedManagement/BookedManagement";
import BookedDetail from "../pages/BookedManagement/BookedDetail/BookedDetail";
import AdminGuard from "../guards/AdminGuard";
import AuthGuard from "../guards/AuthGuard";
import NoAuthGuard from "../guards/NoAuthGuard";
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
          element: (
            <AuthGuard>
              <RoomDetail />
            </AuthGuard>
            ),
        },
        {
          path: "/login",
          element: (
            <NoAuthGuard>
              <Login />
            </NoAuthGuard>
            ),
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/personal-info/:userId",
          element: <PersonalInfo />,
        },
        {
          path: "/listroombylocate",
          element: <ListRoomByLocate />,
        },
      ],
    },

    {
      path: "/admin",
      element: (
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      ),
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
          path: "/admin/department/edit/:departmentId",
          element: <EditDepartment />,
        },
        {
          path: "/admin/position",
          element: <PositionManagement />,
        },
        {
          path: "/admin/position/create",
          element: <CreatePosition />,
        },
        {
          path: "/admin/position/edit/:positionId",
          element: <EditPosition />,
        },
        {
          path: "/admin/booked",
          element: <BookedManagement />,
        },

        {
          path: "/admin/booked/detail/:id",
          element: <BookedDetail />,
        },
      ],
    },
  ]);

  return routing;
}
