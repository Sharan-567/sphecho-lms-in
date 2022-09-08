import React, { useState, useRef } from "react";
import "./SideNav.scss";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Bg1 from "../../assets/bg-1.jpg";

import {
  AiOutlineUser,
  AiOutlineNotification,
  AiOutlineComment,
  AiOutlineFire,
  AiOutlineTool,
  AiOutlineLogout,
} from "react-icons/ai";

const SideNav = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const [activeTab, setActiveTab] = useState("main");
  const containerRef = useRef(null);

  const menuList = [
    {
      Icon: AiOutlineUser,
      title: "My Profile",
      comp: "/",
    },
    {
      Icon: AiOutlineFire,
      title: "Courses",
      comp: "/courses",
    },
    {
      Icon: AiOutlineNotification,
      title: "Announcements",
      comp: "/Annoucements",
    },

    {
      Icon: AiOutlineComment,
      title: "Community",
      comp: "/Forum",
    },
  ];

  const sideBar = {
    open: {
      width: "15rem",
      transition: {
        staggerChildren: 0.01,
      },
    },
    close: {
      width: "4rem",
      transition: {
        staggerChildren: 0.01,
        staggerDirection: -1,
      },
    },
  };

  const image = {
    open: {
      scale: 1,
      x: 0,
      transition: {
        duration: 0.1,
      },
    },
    close: {
      x: -10,
      scale: 0.8,
      transition: {
        duration: 0.1,
      },
    },
  };

  const brand = {
    open: {
      width: "9rem",
      transition: {
        damping: 100,
        stiffness: 100,
        duration: 0.1,
      },
    },
    close: {
      width: "1rem",
      transition: {
        damping: 100,
        stiffness: 100,
        duration: 0.1,
      },
    },
  };

  const item = {
    open: {
      x: 0,
    },
    close: {
      x: 40,
    },
  };

  return (
    <motion.div
      className="bg-blue text-white side-nav"
      variants={sideBar}
      animate={toggleNav ? "close" : "open"}
      ref={containerRef}
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        width: "15rem",
        borderRadius: "0 3rem 3rem 0rem",
        overflow: "hidden",
        position: "sticky",
        top: 0,
      }}
    >
      <Row>
        <Col>
          <div className="p-3">
            <div>
              <motion.button
                variants={brand}
                style={{ width: "9rem" }}
                onClick={() => setToggleNav(!toggleNav)}
                className="mb-3 brand overflow-hidden"
              >
                Sphecho
              </motion.button>
              <div>
                <div className="d-flex align-items-center mb-3">
                  <motion.img
                    variants={image}
                    alt=""
                    src={Bg1}
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="pt-4 ms-2">
                    <p style={{ lineHeight: "0" }}>Clare kellen</p>
                    <p className="small" style={{ fontSize: ".75rem" }}>
                      K.Clara@m16labs.com
                    </p>
                  </div>
                </div>
                {menuList.map(({ Icon, ...Item }, i) => {
                  return (
                    <NavLink
                      to={Item.comp}
                      className={({ isActive }) =>
                        isActive ? "active" : "nav-link"
                      }
                      style={{
                        border: "none",
                        background: "none",
                        textDecoration: "none",
                      }}
                      key={i}
                    >
                      <div className="d-flex" style={{ width: "13rem" }}>
                        <Icon
                          style={{
                            width: "1.3rem",
                            height: "1.3rem",
                          }}
                          className="me-2 nav-icon"
                        />
                        <motion.p
                          variants={item}
                          className="nav-title link"
                          style={{
                            fontSize: "1.1rem",
                            width: "9rem",
                            textAlign: "left",
                            color: "white",
                            fontWeight: "400",
                          }}
                        >
                          {Item.title}
                        </motion.p>
                      </div>
                    </NavLink>
                  );
                })}
                <button
                  style={{ border: "none", background: "none" }}
                  className="d-flex mt-5 b-nav-link"
                >
                  <AiOutlineTool size={20} className="me-2 nav-icon" />
                  <motion.p
                    variants={item}
                    className="text-white ta-l nav-title"
                    style={{ fontSize: ".9rem", width: "9rem" }}
                  >
                    Help And Support
                  </motion.p>
                </button>
                <button
                  style={{ border: "none", background: "none" }}
                  className="d-flex b-nav-link "
                >
                  <AiOutlineLogout size={20} className="me-2 nav-icon" />
                  <motion.p
                    variants={item}
                    className="text-white ta-l nav-title"
                    style={{ fontSize: ".9rem", width: "9rem" }}
                  >
                    LogOut
                  </motion.p>
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default SideNav;
