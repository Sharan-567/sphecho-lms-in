import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideNav } from "../../sections";

const Dashboard = () => {
  return (
    <div>
      <div className="d-flex">
        <SideNav />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
