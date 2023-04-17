import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import PatientLogin from "./PatientLogin";

import logo from "../../assets/colorlogo.png";
import bg from "../../assets/lb1.jpg";

import "./Login.scss";
import StaffMember from "./StaffMember";
import Provider from "./Provider";
import SuperUser from "./SuperUser";

import type { UserState, Auth } from "../../definations/Auth";
import { clearError } from "../../features/auth";
import { useAppDispatch } from "../../store";
import loginGIF from "../../assets/login.gif";

const Login = () => {
  const [loginType, setLoginType] = useState<UserState>();
  const [currentSelectedAuth, setCurrentSelectedAuth] = useState<Auth>();
  const dispatch = useAppDispatch();
  // type -> 1 => m16login
  // type -> 2 => patient
  // refer django lms code

  // after authenticating with lms
  // send lmsAUthizeTYpe(type) 1 -> patient, 2->staff/doctor, 3 -> staffMember/superUser

  const loginTypes: Auth[] = [
    {
      title: "Client" || "Patient",
      userState: "Patient",
      user_type: "",
      type: "2",
      lmsAuthorizeType: "1",
    },
    {
      title: "Provider",
      userState: "Provider",
      user_type: "Doctor",
      type: "1",
      lmsAuthorizeType: "2",
    },
    {
      title: "Staff Member",
      userState: "staffMember",
      user_type: "SuperUser",
      type: "1",
      lmsAuthorizeType: "3",
    },
    {
      title: "Super User",
      userState: "SuperUser",
      user_type: "SuperUser",
      type: "1",
      lmsAuthorizeType: "3",
    },
  ];

  return (
    <div className=" bg-container">
      <Row style={{}}>
        <Col
          sm={8}
          className="p-2 d-flex flex-column justify-content-center align-items-center title-container"
          style={{
            height: "100vh",
            position: "relative",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
          }}
        >
          {/* <div className="p-4">
            <Link to="/">
              <img src={logo} width="159px" />
            </Link>
          </div> */}
          <div
            className="p-4"
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
            }}
          >
            <Link to="/">
              <img src={logo} width="120px" />
            </Link>
          </div>
        </Col>
        <Col
          sm={4}
          style={{
            boxShadow: "-5px 0px 30xp 20px rgba(0,0,0,.7)",
          }}
          className="p-5 pt-0 d-flex justify-content-center align-items-center"
        >
          <div className="login-wrapper m-auto p-2" style={{ width: "100%" }}>
            {!loginType ? (
              <>
                <img src={loginGIF} style={{ width: "30rem" }} />
                <p
                  className="text-left text-primary mb-1 b-600"
                  style={{
                    fontSize: "2rem",
                    fontWeight: "800",
                    fontFamily: "inter",
                  }}
                >
                  Login to <br></br>
                  My Blackboard
                </p>

                <p
                  className="text-left text-black mb-5"
                  style={{ fontSize: "1.1rem" }}
                >
                  Select user login type.
                </p>
                {(loginTypes || []).map((item, idx) => (
                  <AnimatePresence exitBeforeEnter>
                    <motion.button
                      key={idx}
                      initial={{ y: 35, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -35, opacity: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.2 }}
                      style={{
                        fontSize: "1.1rem",
                        borderRadius: "1.2rem 0 1.2rem 0",
                        border: "none",
                        // boxShadow: "0px 0px 10px 0.5px rgba(0,0,0,0.1)",
                      }}
                      className="w-100 mb-3 py-4  btn-login-an"
                      onClick={() => {
                        setLoginType(item.userState);
                        setCurrentSelectedAuth(item);
                        dispatch(clearError());
                      }}
                    >
                      {item.title}
                    </motion.button>
                  </AnimatePresence>
                ))}
              </>
            ) : (
              <div
                className="d-flex br-3 justify-content-center align-items-center w-100 bg-white"
                style={{ minHeight: "50vh" }}
              >
                <div>
                  {loginType === "Patient" ? (
                    <PatientLogin
                      setLoginType={setLoginType}
                      currentSelectedAuth={currentSelectedAuth}
                    />
                  ) : null}
                  {loginType === "staffMember" ? (
                    <StaffMember
                      setLoginType={setLoginType}
                      currentSelectedAuth={currentSelectedAuth}
                    />
                  ) : null}
                  {loginType === "Provider" ? (
                    <Provider
                      setLoginType={setLoginType}
                      currentSelectedAuth={currentSelectedAuth}
                    />
                  ) : null}
                  {loginType === "SuperUser" ? (
                    <SuperUser
                      setLoginType={setLoginType}
                      currentSelectedAuth={currentSelectedAuth}
                    />
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
