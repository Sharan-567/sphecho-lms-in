import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SideNav } from "../../sections";
import TopNav from "../../sections/SideNav/TopNav";
import AdminSideNav from "../../adminSections/AdminSideNav";
import AdminTopNav from "../../adminSections/AdminTopNav/AdminTopNav";

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

  const getTopNav = () => {
    let loc = location.pathname.split("/")[1];
    if (loc === "admin") {
      return <AdminTopNav />;
    }
    return <TopNav />;
  }

  return (
    <div>
      <div className={`${width && "d-flex"} bg-graydark`}>
        {!width ? getTopNav() : getSideNav()}
        <div className={`${width && "w-100 bg-primary m-0 p-0"}`}>
          {!width ? <div className="py-4">
          <div className="br-3 bg-white" style={{minHeight: "95vh"}}>
          <Outlet />
          </div>
          </div> :<div className="br-2 py-4 pe-4">
          <div className="br-3 bg-white" style={{minHeight: "95vh"}}>
          <Outlet />
          </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
