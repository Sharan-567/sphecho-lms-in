import React, { useState } from "react";
import { Main, SideNav } from "../../sections";

const Dashboard = () => {
  return (
    <div>
      <div className="d-flex">
        <SideNav />
        <Main />
      </div>
    </div>
  );
};

export default Dashboard;
