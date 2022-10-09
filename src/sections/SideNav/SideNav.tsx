import React, { useState, useRef } from "react";
import { useMotionValue, motion } from "framer-motion";
import "./SideNav.scss";
import { Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import Bg1 from "../../assets/bg-1.jpg";

import {
  AiOutlineUser,
  AiOutlineNotification,
  AiOutlineComment,
  AiOutlineFire,
  AiOutlineTool,
  AiOutlineLogout,
} from "react-icons/ai";

interface MenuList {
  Icon: IconType;
  title: string;
  to: string;
}

const SideNav = () => {
  const currentTab = useMotionValue<number>(0);
  const navigate = useNavigate();

  const menuList: MenuList[] = [
    {
      Icon: AiOutlineUser,
      title: "My Profile",
      to: "/",
    },
    {
      Icon: AiOutlineFire,
      title: "Courses",
      to: "/courses",
    },
    {
      Icon: AiOutlineNotification,
      title: "Webinars",
      to: "/webinars",
    },

    {
      Icon: AiOutlineComment,
      title: "Community",
      to: "/Forum",
    },
  ];

  const getYpostion = () => {
    return currentTab.get() * 68;
  };

  const handleTab = (route: string, tabNo: number) => {
    currentTab.set(tabNo);
    navigate(route);
  };

  return (
    <div
      className="py-5 ps-5"
      style={{
        position: "sticky",
        top: 0,
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <div
        className="bg-blue br-2"
        style={{
          position: "sticky",
          top: "3rem",
          width: "16rem",
          height: "100%",
          paddingLeft: "2rem",
        }}
      >
        <div>
          <div className="p-4 text-white">
            <h1>Specho</h1>
          </div>
        </div>
        <div
          style={
            {
              //  outline: "1px solid yellow"
            }
          }
        >
          <div style={{ height: 0, display: "hidden" }}>
            <svg
              viewBox="0 0 230 107"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath
                  id="clip"
                  clipPathUnits="objectBoundingBox"
                  transform="scale(0.00434782608 0.00934579439)"
                >
                  <path
                    d="M190.309 84.5471H27.9232C27.9232 84.5471 -1.30764 80.265 0.0455749 55.2432C1.39879 30.2215 27.9232 25.2565 27.9232 25.2565H190.309C215.773 25.2565 219.725 19.4545 230 0V107C222.071 94.1175 216.123 84.5471 190.309 84.5471Z"
                    fill="#FF0000"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <motion.div
            className="tab"
            animate={{ transform: `translateY(${getYpostion()}px)` }}
          ></motion.div>

          {menuList.map((link, id) => {
            return (
              <div key={id}>
                <div
                  onClick={() => handleTab(link.to, id)}
                  className={`${
                    currentTab.get() == id ? "text-blue" : "text-white"
                  } b-700 px-4 p-3 my-3`}
                  style={{
                    fontSize: "1.3rem",
                    // outline: "1px solid red",
                    cursor: "pointer",
                  }}
                >
                  <link.Icon size={"1.5rem"} className="me-3" />
                  {link.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
