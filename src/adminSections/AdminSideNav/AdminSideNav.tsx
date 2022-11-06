import React, { useState, useRef } from "react";
import { useMotionValue, motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";

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

const AdminSideNav = () => {
  const currentTab = useMotionValue<number>(0);
  const [closeNav, setCloseNav] = useState(false);
  const navigate = useNavigate();

  const menuList: MenuList[] = [
    {
      Icon: AiOutlineUser,
      title: "Dashboard",
      to: "/admin",
    },
    {
      Icon: AiOutlineFire,
      title: "Courses",
      to: "/admin/coursesMangement",
    },
    {
      Icon: AiOutlineNotification,
      title: "Topics",
      to: "/admin/topicsMangement",
    },
    {
      Icon: AiOutlineTool,
      title: "Assessment",
      to: "/admin/assessmentMangement",
    },
    {
      Icon: AiOutlineComment,
      title: "Questions",
      to: "/admin/questionMangement",
    },
    {
      Icon: AiOutlineComment,
      title: "Badges",
      to: "/admin/badgeMangement",
    },
    {
      Icon: AiOutlineComment,
      title: "Certification",
      to: "/admin/certificationMangement",
    },
  ];

  const getYpostion = () => {
    return currentTab.get() * 61;
  };

  const handleTab = (route: string, tabNo: number) => {
    currentTab.set(tabNo);
    navigate(route);
  };

  return (
    <div
      className=""
      style={{
        position: "sticky",
        top: 0,
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <motion.div
        className="bg-blue "
        animate={{ width: `${closeNav ? "4.5rem" : "16rem"}` }}
        style={{
          // borderRadius: "0rem 3rem 3rem 0rem",
          position: "sticky",
          top: "3rem",
          height: "100%",
          paddingLeft: "2rem",
          overflow: "hidden",
        }}
      >
        <div>
          <div className="p-4 text-white">
            <motion.button
              animate={
                closeNav ? { width: "1.5rem", marginLeft: "-1.7rem" } : {}
              }
              onClick={() => setCloseNav((p) => !p)}
              style={{
                outline: "none",
                border: "none",
                background: "none",
                color: "white",
                overflow: "hidden",
              }}
            >
              <h1>Specho</h1>
              <motion.p
                animate={
                  closeNav ? { fontSize: ".5rem" } : { fontSize: ".9rem" }
                }
              >
                admin
              </motion.p>
            </motion.button>
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
              fill="white"
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
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <motion.div
            className="tab bg-white"
            animate={{ transform: `translateY(${getYpostion()}px)` }}
          ></motion.div>

          {menuList.map((link, id) => {
            return (
              <div key={id}>
                <motion.div
                  onClick={() => handleTab(link.to, id)}
                  className={`${
                    currentTab.get() == id ? "text-blue" : "text-white"
                  } b-700 px-4 p-3 my-3`}
                  animate={{ margin: `${closeNav ? "-1.55rem" : "0rem"}` }}
                  style={{
                    fontSize: "1.1rem",
                    // outline: "1px solid red",
                    cursor: "pointer",
                    width: "14rem",
                  }}
                >
                  <link.Icon size={"1.5rem"} className="me-3" />
                  {link.title}
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSideNav;
