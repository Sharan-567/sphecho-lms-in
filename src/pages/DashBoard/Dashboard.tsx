import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SideNav } from "../../sections";
import TopNav from "../../sections/SideNav/TopNav";
import AdminSideNav from "../../adminSections/AdminSideNav";

const Dashboard = () => {
  const location = useLocation();
  const width = window.innerWidth > 680;
  const getSideNav = () => {
    let loc = location.pathname.split("/")[1];
    if (loc === "admin") {
      return <AdminSideNav />;
    }
    return <SideNav />;
  };
  return (
    <div>
      <div className={`${width && "d-flex"} bg-graydark`}>
        {!width ? <TopNav /> : getSideNav()}
        <div className={`${width && "container w-75"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
