import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideNav } from "../../sections";

const Dashboard = () => {
  return (
    <div>
      <div className="d-flex bg-graydark">
        <SideNav />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
