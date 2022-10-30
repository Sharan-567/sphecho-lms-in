import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSideNav from "../../adminSections/AdminSideNav";
import TopNav from "../../sections/SideNav/TopNav";

const AdminDashboard = () => {
  const width = window.innerWidth > 680;
  return (
    <div>
      <div className={`${width && "d-flex"} bg-graydark`}>
        {!width ? <TopNav /> : <AdminSideNav />}
        <div className={`${width && "container w-75"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
