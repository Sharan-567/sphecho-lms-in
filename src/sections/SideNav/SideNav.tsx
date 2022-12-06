import React, { useState, useRef } from "react";
import { useMotionValue, motion } from "framer-motion";
import "./SideNav.scss";
import { Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import whiteLogo from "../../assets/white-logo.png";
import {
  AiOutlineUser,
  AiOutlineNotification,
  AiOutlineComment,
  AiOutlineFire,
  AiOutlineAccountBook,
  AiOutlineFileProtect,
  AiOutlineCalculator,
} from "react-icons/ai";
import TopNav from "./TopNav";
import { number } from "yup/lib/locale";

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

const ButtonMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  pressed: { scale: 0.98 },
};

const SideNav = () => {
  const [currentSelectedTab, setCurrentSelectedTab] = useState<number>(1);
  const [closeNav, setCloseNav] = useState(false);
  const childListRef = useRef<Array<HTMLDivElement | null>>([]);
  const parentRef = useRef<HTMLDivElement>(null);
  const subNavRef = useRef<HTMLDivElement>(null);
  const [currentActiveSubNavList, setCurrentActiveSubList] = useState<number>();
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
          Icon: AiOutlineCalculator,
          to: "/courses",
        },
        {
          title: "Certification",
          Icon: AiOutlineFileProtect,
          to: "/certification",
        },
      ],
    },
    {
      id: 3,
      Icon: AiOutlineNotification,
      title: "Webinars",
      to: "/webinars",
    },

    // {
    //   id: 4,
    //   Icon: AiOutlineComment,
    //   title: "Community",
    //   to: "/Forum",
    // },
  ];

  const getSubNavList = () => {
    return menuList.filter((nav) => nav.subNavItems);
  };

  const getYpostion = () => {
    let parentTop = parentRef.current?.getBoundingClientRect().top;
    let childTop =
      childListRef.current[currentSelectedTab]?.getBoundingClientRect().top;
    if (parentTop && childTop) {
      return childTop - parentTop - 19.5;
    }
    return 0;
  };

  const handleTab = (route?: string, tabNo?: number) => {
    if (tabNo) {
      setCurrentSelectedTab(tabNo);
      setCurrentActiveSubList(tabNo);
    }
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
        transition={{ bounce: 0 }}
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
              transition={{ damping: "1000", bounce: 0 }}
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
                animate={closeNav ? { width: "4.7rem" } : { width: "10rem" }}
              />
            </motion.button>
          </div>
        </div>
        <div
          ref={parentRef}
          style={
            {
              // outline: "1px solid yellow",
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

          {(menuList || []).map((link) => {
            return (
              <div key={link.id}>
                <motion.div
                  ref={(el) => (childListRef.current[link.id] = el)}
                  onClick={() => handleTab(link.to, link.id)}
                  className={`${
                    currentSelectedTab == link.id ? "text-blue" : "text-white"
                  } b-700 px-4 p-3 my-3`}
                  animate={{ margin: `${closeNav ? "-1.55rem" : "0rem"}` }}
                  variants={ButtonMotion}
                  initial="rest"
                  whileHover="hover"
                  whileTap="pressed"
                  style={{
                    fontSize: "1.1rem",
                    position: "relative",
                    // outline: "1px solid red",
                    cursor: "pointer",
                    width: "14rem",
                    // borderRadius: "2rem 0rem 0rem 2rem",
                  }}
                >
                  <link.Icon size={"1.5rem"} className="me-3" />
                  {link.title}
                  {currentSelectedTab === link.id ? (
                    <motion.div
                      className="tab bg-white"
                      layoutId="back"
                      style={{ position: "absolute", top: -18, width: "100%" }}
                      transition={{
                        type: "spring",
                        duration: 0.5,
                        stiffness: 500,
                        damping: 32,
                      }}
                    ></motion.div>
                  ) : null}
                </motion.div>
                {link.subNavItems && currentSelectedTab === link.id ? (
                  <motion.div
                    ref={subNavRef}
                    className="br-2 p-2"
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.328)",
                      width: "13rem",
                    }}
                  >
                    {(link.subNavItems || []).map((subLink) => {
                      return (
                        <motion.div
                          className="p-2 ps-4 text-white br-1 mb-2"
                          onClick={() => handleTab(subLink.to)}
                          variants={ButtonMotion}
                          initial="rest"
                          whileHover="hover"
                          whileTap="pressed"
                          animate={{ scale: 1 }}
                          style={{
                            fontSize: "1.1rem",
                            // outline: "1px solid red",
                            cursor: "pointer",
                            width: "13rem",
                          }}
                        >
                          <subLink.Icon size={"1.5rem"} className="me-3" />
                          {subLink.title}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : null}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SideNav;
