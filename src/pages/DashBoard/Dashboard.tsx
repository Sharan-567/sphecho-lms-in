import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SideNav } from "../../sections";
import TopNav from "../../sections/SideNav/TopNav";

const Dashboard = () => {
  const width = window.innerWidth > 680;
  return (
    <div>
      <div className={`${width && "d-flex"} bg-graydark`}>
        {!width ? <TopNav /> : <SideNav />}
        <div className={`${width && "container w-75"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
