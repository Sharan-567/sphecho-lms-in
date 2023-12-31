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
  AiOutlineTool,
  AiOutlineSend,
  AiFillMinusSquare,
  AiOutlinePercentage,
  AiOutlineSafety,
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
  const [menuList, setMenuList] = React.useState<MenuList[]>();

  React.useEffect(() => {
    const patientsMenu: MenuList[] = [
      {
        id: 1,
        Icon: AiOutlineUser,
        title: "Dashboard",
        to: "/",
      },
      // {
      //   id: 2,
      //   Icon: AiOutlineFire,
      //   title: "Curriculum",
      //   subNavItems: [
      //     {
      //       title: "Courses",
      //       Icon: AiOutlineCalculator,
      //       to: "/courses",
      //     },
      //     {
      //       title: "Certification",
      //       Icon: AiOutlineFileProtect,
      //       to: "/certification",
      //     },
      //   ],
      // },
      {
        id: 2,
        title: "My courses",
        Icon: AiOutlineCalculator,
        to: "/courses",
      },
      {
        id: 3,
        title: "My certificates",
        Icon: AiOutlineFileProtect,
        to: "/certification",
      },
      // {
      //   id: 4,
      //   Icon: AiOutlineComment,
      //   title: "Community",
      //   to: "/Forum",
      // },
    ];

    const superUserMenu: MenuList[] = [
      {
        id: 1,
        Icon: AiOutlineUser,
        title: "Dashboard",
        to: "/",
      },
      {
        id: 13,
        Icon: AiOutlineAccountBook,
        title: "Analytics",
        to: "/analytics",
      },
      // {
      //   id: 2,
      //   Icon: AiOutlineFire,
      //   title: "Curriculum",
      //   subNavItems: [
      //     {
      //       title: "Courses",
      //       Icon: AiOutlineCalculator,
      //       to: "/courses",
      //     },
      //     {
      //       title: "Certification",
      //       Icon: AiOutlineFileProtect,
      //       to: "/certification",
      //     },
      //   ],
      // },
      {
        id: 100,
        title: "My courses",
        Icon: AiOutlineCalculator,
        to: "/courses",
      },
      {
        id: 101,
        title: "My certificates",
        Icon: AiOutlineFileProtect,
        to: "/certification",
      },
      {
        id: 3,
        Icon: AiOutlineNotification,
        title: "Webinars",
        to: "/webinars",
      },
      {
        id: 5,
        Icon: AiOutlineUser,
        title: "Users",
        to: "/userMangement",
      },
      {
        id: 6,
        Icon: AiOutlineFire,
        title: "Courses",
        to: "/coursesMangement",
      },
      {
        id: 7,
        Icon: AiOutlineNotification,
        title: "Topics",
        to: "/topicsMangement",
      },
      {
        id: 8,
        Icon: AiOutlinePercentage,
        title: "Assessment",
        to: "/assessmentMangement",
      },
      {
        id: 9,
        Icon: AiOutlineTool,
        title: "Questions",
        to: "/questionMangement",
      },
      {
        id: 10,
        Icon: AiOutlineSafety,
        title: "Badges",
        to: "/badgeMangement",
      },
      {
        id: 11,
        Icon: AiOutlineComment,
        title: "Certification",
        to: "/certificationMangement",
      },
      {
        id: 12,
        Icon: AiOutlineSend,
        title: "Events",
        to: "/eventMangement",
      },
    ];
    const userState = localStorage.getItem("userState");
    if (userState) {
      if (userState === "SuperUser" || userState === "staffMember") {
        setMenuList(superUserMenu);
      } else {
        setMenuList(patientsMenu);
      }
    }
  }, []);

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
        top: "0",
        height: "100vh",
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
              // onClick={() => setCloseNav((p) => !p)}
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
                animate={
                  closeNav
                    ? { width: "4.7rem" }
                    : { width: "10rem", marginTop: ".3rem" }
                }
              />
            </motion.button>
          </div>
        </div>
        <div
          ref={parentRef}
          style={{ height: "80vh", overflowY: "scroll", paddingTop: ".6rem" }}
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
                  } b-500 px-4 p-3 my-2`}
                  animate={{ margin: `${closeNav ? "-1.55rem" : "0rem"}` }}
                  variants={ButtonMotion}
                  initial="rest"
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
