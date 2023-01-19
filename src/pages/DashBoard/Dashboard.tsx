import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import { SideNav } from "../../sections";
import TopNav from "../../sections/SideNav/TopNav";
import AdminSideNav from "../../adminSections/AdminSideNav";
import AdminTopNav from "../../adminSections/AdminTopNav/AdminTopNav";
import { useAppDispatch, useAppSelector } from "../../store";
import { hideToast } from "../../features/toast";
import { ToastContainer } from "react-bootstrap";

const Dashboard = () => {
  const location = useLocation();
  const toast = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();
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
  };

  return (
    <>
      <div>
        <div className={`${width && "d-flex"} bg-graydark`}>
          {!width ? getTopNav() : getSideNav()}
          <div className={`${width && "w-100 bg-primary m-0 p-0"}`}>
            {!width ? (
              <div className="py-4">
                <div className="br-3 bg-white" style={{ minHeight: "95vh" }}>
                  <Outlet />
                </div>
              </div>
            ) : (
              <div className="br-2 py-4 pe-4">
                <div className="br-3 bg-white" style={{ minHeight: "95vh" }}>
                  <Outlet />
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ position: "absolute", top: "5px", right: "6px" }}>
          <Toast
            className="d-inline-block m-1"
            bg={toast.type}
            onClose={() => dispatch(hideToast())}
            show={toast.showToast}
            delay={3000}
            autohide
          >
            <Toast.Body
              className={`${toast.type}`}
              style={{ fontWeight: "bold", color: "white" }}
            >
              {toast.message}
            </Toast.Body>
          </Toast>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
