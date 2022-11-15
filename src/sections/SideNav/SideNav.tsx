import React, { useState, useRef } from "react";
import { useMotionValue, motion } from "framer-motion";
import "./SideNav.scss";
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
  AiOutlineAccountBook,
  AiOutlineCalculator,
} from "react-icons/ai";
import TopNav from "./TopNav";
import { number } from "yup/lib/locale";
import Menu from "./Menu";

interface MenuList {
  id: number;
  Icon: IconType;
  title: string;
  to?: string;
  subNavItems?: {
    Icon: IconType;
    title: string;
    to: string;
  }[];
}

const SideNav = () => {
  const currentTab = useMotionValue<number>(0);
  const [currentSelectedTab, setCurrentSelectedTab] = useState<number>(0);
  const [closeNav, setCloseNav] = useState(false);
  const parentRef = useRef<HTMLDivElement>();
  const childListRef = useRef([]);
  const navigate = useNavigate();

  const menuList: MenuList[] = [
    {
      id: 1,
      Icon: AiOutlineUser,
      title: "My Profile",
      to: "/",
    },
    {
      id: 2,
      Icon: AiOutlineFire,
      title: "Curriculum",
      subNavItems: [
        {
          title: "Courses",
          Icon: AiOutlineAccountBook,
          to: "/courses",
        },
        {
          title: "Exam",
          Icon: AiOutlineCalculator,
          to: "/exam",
        },
      ],
    },
    {
      id: 3,
      Icon: AiOutlineNotification,
      title: "Webinars",
      to: "/webinars",
    },

    {
      id: 4,
      Icon: AiOutlineComment,
      title: "Community",
      to: "/Forum",
    },
  ];

  const getYpostion = () => {
    parentRef.current?.getBoundingClientRect();
  };

  const handleTab = (route?: string, tabNo?: number) => {
    if (tabNo) setCurrentSelectedTab(tabNo);
    if (route) navigate(route);
  };

  return (
    <div
      // className="py-2 ps-3"
      style={{
        position: "sticky",
        top: 0,
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <motion.div
        className="bg-primary"
        animate={{ width: `${closeNav ? "4.5rem" : "16rem"}` }}
        style={{
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
              fill="#FFFFF"
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
                    fill="#000"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <motion.div
            className="tab bg-white"
            animate={{ transform: `translateY(${getYpostion()}px)` }}
          ></motion.div>
          <Menu {...{ menuList, currentSelectedTab, handleTab, closeNav }} />
        </div>
      </motion.div>
    </div>
  );
};

export default SideNav;
