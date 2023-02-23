import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import { motion, AnimatePresence } from "framer-motion";

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

const StaffMember = ({ setLoginType, currentSelectedAuth }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { err: error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleProviderLogin = () => {
    if (currentSelectedAuth) {
      const { type, userState, user_type, lmsAuthorizeType } =
        currentSelectedAuth;

      dispatch(
        login({
          username,
          password,
          type,
          userState,
          user_type,
          lmsAuthorizeType,
        })
      )
        .unwrap()
        .then((res) => {
          navigate("/");
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
        {error ? <p className="text-danger">{error}</p> : null}
        <h1 className="mb-5 text-primary text-center">Staff Member Login</h1>
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
          className="py-3 text-center b-600 br-1 mb-3"
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
          LOGIN
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
