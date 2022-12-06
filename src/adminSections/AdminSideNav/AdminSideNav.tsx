import React, { useState, useRef } from "react";
import { useMotionValue, motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import whiteLogo from "../../assets/white-logo.png";
import {
  AiOutlineUser,
  AiOutlineNotification,
  AiOutlineComment,
  AiOutlineFire,
  AiOutlineTool,
  AiOutlineHome,
  AiOutlinePercentage,
  AiOutlineSafety,
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
      Icon: AiOutlineHome,
      title: "Dashboard",
      to: "/admin",
    },
    {
      Icon: AiOutlineUser,
      title: "Users",
      to: "/admin/userMangement",
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
      Icon: AiOutlinePercentage,
      title: "Assessment",
      to: "/admin/assessmentMangement",
    },
    {
      Icon: AiOutlineTool,
      title: "Questions",
      to: "/admin/questionMangement",
    },
    {
      Icon: AiOutlineSafety,
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
        className="bg-primary "
        animate={{ width: `${closeNav ? "4.5rem" : "16rem"}` }}
        transition={{ bounce: 0 }}
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
              <motion.img
                src={whiteLogo}
                animate={closeNav ? { width: "4.7rem" } : { width: "8rem" }}
              />
              {/* <motion.p
                animate={
                  closeNav ? { fontSize: ".5rem" } : { fontSize: ".9rem" }
                }
              >
                admin
              </motion.p> */}
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
          <div style={{ height: 0, width: "0", display: "hidden" }}>
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
          <div style={{ marginTop: "-.5rem" }}>
            {menuList.map((link, id) => {
              return (
                <div key={id}>
                  <motion.div
                    onClick={() => handleTab(link.to, id)}
                    className={`${
                      currentTab.get() == id ? "text-blue" : "text-white"
                    } b-700 px-4 p-3 my-1`}
                    animate={{ margin: `${closeNav ? "-1.55rem" : "0rem"}` }}
                    style={{
                      fontSize: "1.1rem",
                      // outline: "1px solid red",
                      cursor: "pointer",
                      width: "14rem",
                      position: "relative",
                    }}
                  >
                    <link.Icon size={"1.5rem"} className="me-3" />
                    {link.title}
                    {currentTab.get() === id ? (
                      <motion.div
                        className="tab bg-white"
                        layoutId="back"
                        style={{
                          position: "absolute",
                          top: -18,
                          width: "100%",
                        }}
                        transition={{
                          type: "spring",
                          duration: 0.5,
                          stiffness: 500,
                          damping: 32,
                        }}
                      ></motion.div>
                    ) : null}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSideNav;
