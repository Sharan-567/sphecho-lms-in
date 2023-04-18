import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login, makeLogin } from "../../features/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import { motion, AnimatePresence } from "framer-motion";
import { customAxios } from "../../services/utils";
import loginGIF from "../../assets/lock.gif";

type UserState = "Patient" | "Provider" | "SuperUser" | "staffMember";
type Auth = {
  title: string;
  userState: UserState;
  user_type: string;
  type: string;
  lmsAuthorizeType: string;
};

type Props = {
  setLoginType: React.Dispatch<React.SetStateAction<UserState | undefined>>;
  currentSelectedAuth: Auth | undefined;
};

const isSmallScreen = window.screen.width < 990;

const StaffMember = ({ setLoginType, currentSelectedAuth }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
              .get(`/accounts/authorize/?token=${token}&type=3`)
              .then((resLms) => {
                localStorage.setItem("token", resLms.data.token);
                if (resLms.data.user) {
                  if (resLms.data.user.role === 3) {
                    localStorage.setItem("email", resLms.data.user.email);
                    localStorage.setItem("userState", userState);
                    localStorage.setItem(
                      "is_superuser",
                      resLms.data.user.is_superuser
                    );
                    navigate("/");
                    localStorage.setItem("name", resLms.data.user.name);
                    localStorage.setItem("m16_id", resLms.data.user.m16_id);
                    localStorage.setItem("lms_id", resLms.data.user.id);
                    localStorage.setItem("role", resLms.data.user.role);
                    dispatch(makeLogin());
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
        {error ? <p className="text-danger">{error}</p> : null}
        <h1 className="mb-5 text-primary text-center">SuperUser Login</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="py-3 mb-3 text-center b-600 br-1"
          placeholder="UserName"
          style={{
            fontSize: "1.2rem",
            border: "1px solid #81a31b",
            display: "block",
            width: "100%",
          }}
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-3 mb-3 text-center b-600 br-1"
          placeholder="Password"
          style={{
            fontSize: "1.2rem",
            border: "1px solid #81a31b",
            display: "block",
            width: "100%",
          }}
          type="password"
        />

        <Button
          className="p-2 px-4 br-1 py-3 mt-4 text-white "
          style={{ width: "10rem" }}
          onClick={handleProviderLogin}
        >
          {loading ? "Loading ..." : "LOGIN"}
        </Button>
        <Button
          className="p-2 px-4 br-1 py-3 bg-black mt-4 text-white ms-2"
          onClick={() => setLoginType(undefined)}
        >
          G0 back
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default StaffMember;
