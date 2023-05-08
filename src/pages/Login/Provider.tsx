import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Auth, UserState } from "../../definations/Auth";
import { login, makeLogin } from "../../features/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import { motion, AnimatePresence } from "framer-motion";
import { customAxios } from "../../services/utils";
import loginGIF from "../../assets/lock.gif";
import "./Login.scss";
type Props = {
  setLoginType: React.Dispatch<React.SetStateAction<UserState | undefined>>;
  currentSelectedAuth: Auth | undefined;
};
const isSmallScreen = window.screen.width < 990;

const Provider = ({ setLoginType, currentSelectedAuth }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const handleProviderLogin = () => {
  //   if (currentSelectedAuth) {
  //     const { type, userState, user_type, lmsAuthorizeType } =
  //       currentSelectedAuth;
  //     dispatch(
  //       login({
  //         username,
  //         password,
  //         type,
  //         userState,
  //         user_type,
  //         lmsAuthorizeType,
  //       })
  //     )
  //       .unwrap()
  //       .then((res) => {
  //         navigate("/");
  //       });
  //   }
  // };

  const handleProviderLogin = () => {
    setError("");
    setLoading(true);
    if (currentSelectedAuth) {
      const { type, userState, user_type, lmsAuthorizeType } =
        currentSelectedAuth;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("type", type); // for meta login type is 1
      formData.append("user_type", user_type); // for type of user
      customAxios
        .post("/accounts/auth/", formData)
        .then((res) => {
          setLoading(false);
          if (res.data.error) {
            setError(res.data.error);
          } else {
            let token = res.data.token;
            customAxios
              .get(`/accounts/authorize/?token=${token}&type=2`)
              .then((resLms) => {
                if (resLms.data.user) {
                  if (resLms.data.user.role === 2) {
                    //  <===== provider role 2
                    localStorage.setItem("token", resLms.data.token);
                    localStorage.setItem("email", resLms.data.user.email);
                    localStorage.setItem("userState", userState);
                    localStorage.setItem(
                      "is_superuser",
                      resLms.data.user.is_superuser
                    );
                    localStorage.setItem("name", resLms.data.user.name);
                    localStorage.setItem("m16_id", resLms.data.user.m16_id);
                    localStorage.setItem("lms_id", resLms.data.user.id);
                    localStorage.setItem("role", resLms.data.user.role);
                    dispatch(makeLogin());
                    navigate("/");
                  } else {
                    setError("Invalid credentials..try again");
                  }
                }
              })
              .catch((err) => {
                setLoading(false);
                if (err.message) {
                  setError(err.message);
                } else {
                  setError("Something went wrong");
                }
              });
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.message) {
            setError(err.message);
          } else {
            setError("Something went wrong");
          }
        });
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={"ti-tle"}
        initial={{ y: 45, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -45, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="px-2 "
      >
        <img
          src={loginGIF}
          style={{
            width: isSmallScreen ? "30rem" : "30rem",
            objectFit: "contain",
            marginLeft: isSmallScreen ? "-3.5rem" : "inherit",
          }}
        />

        <h1 className="mb-5 text-primary text-center">Provider Login</h1>
        <div className="d-flex align-items-center justify-content-center flex-column">
          {error ? <p className="text-danger text-center">{error}</p> : null}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Mobile Number"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input"
            type="password"
          />

          <Button
            className="btn-login"
            style={{ width: "10rem" }}
            onClick={handleProviderLogin}
          >
            {loading ? "Loading ..." : "LOGIN"}
          </Button>
          <Button
            className="go-back-btn"
            onClick={() => setLoginType(undefined)}
          >
            Go back
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Provider;
