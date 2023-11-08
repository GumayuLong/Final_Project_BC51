import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import HeaderHome from "../../components/Header/Header";

export default function HomeLayout() {
  return (
    <div>
      <HeaderHome />
      <Outlet />
      <Footer />
    </div>
  );
}
