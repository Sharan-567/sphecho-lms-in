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
        <div className={`${width && "container w-100 bg-blue m-0 p-0"}`}>
          <div className="br-2 py-4 pe-4">
          <div className="br-3 bg-white">
          <Outlet />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
