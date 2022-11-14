import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import PatientLogin from "./PatientLogin";
import ProviderLogin from "./ProviderLogin";

import logo from "../../assets/01_Logo_2x.png";
import circle from "../../assets/element-bg2.png";
import bg from "../../assets/banner-bg.png";
import "./Login.scss";
type Usertype = "Patient" | "Provider" | "SuperUser";

const Login = () => {
  const [loginType, setLoginType] = useState<Usertype>();

  const loginTypes: { title: string; userType: Usertype }[] = [
    {
      title: "Patient",
      userType: "Patient",
    },
    {
      title: "Provider",
      userType: "Provider",
    },
    {
      title: "superUser",
      userType: "SuperUser",
    },
  ];

  return (
    <div className="container bg-container">
      <img
        src={bg}
        height="100vh"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          zIndex: -1,
        }}
      />
      <div className="p-4">
        <Link to="/">
          <img src={logo} width="159px" />
        </Link>
      </div>
      <Row>
        <Col
          sm={6}
          className="p-2 d-flex justif-content-center align-items-center title-container position-relative"
          style={{ height: "60vh" }}
        >
          <img
            className="position-absolute top-0 left-0"
            src={circle}
            width="94%"
          />
          <motion.h1
            className="title"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            style={{ fontSize: "6rem" }}
          >
            Welcome to{" "}
            <h1
              className="text-primary"
              style={{ fontSize: "7rem", textDecoration: "underline" }}
            >
              Sphecho
            </h1>
          </motion.h1>
        </Col>
        <Col sm={6} className=" p-5">
          <div className="login-wrapper m-auto p-2" style={{ width: "100%" }}>
            {!loginType ? (
              <>
                <p className="text-center" style={{ fontSize: "2rem" }}>
                  Select The Login Type
                </p>
                {(loginTypes || []).map((item) => (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0, 0.71, 0.2, 1.01],
                      staggerChildren: 0.5,
                    }}
                    style={{
                      border: "none",
                      borderLeft: "7px solid #81a31b",
                      fontSize: "1.4rem",
                    }}
                    className="w-100 m-3 b-600 py-4 btn-login shadow br-1 bg-white"
                    onClick={() => setLoginType(item.userType)}
                    key={item.title}
                  >
                    {item.title}
                  </motion.button>
                ))}
              </>
            ) : (
              <div
                className="d-flex br-3 justify-content-center align-items-center w-100 p-2 shadow bg-white"
                style={{ minHeight: "50vh" }}
              >
                {loginType === "Patient" ? (
                  <PatientLogin {...{ setLoginType }} />
                ) : null}
                {loginType === "Provider" ? <ProviderLogin /> : null}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
