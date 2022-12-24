import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth";
import { useAppDispatch, useAppSelector } from "../../store";

type UserState = "Patient" | "Provider" | "SuperUser" | "staffMember";
type Auth = {
  title: string;
  userState: UserState;
  user_type: string;
  type: string;
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
      const { type, userState, user_type } = currentSelectedAuth;

      dispatch(login({ username, password, type, userState, user_type }))
        .unwrap()
        .then((res) => {
          navigate("/");
        });
    }
  };

  return (
    <div className="p-2 w-100 d-flex flex-column justify-content-center align-items-center">
      {error ? <p className="text-danger">{error}</p> : null}
      <h1 className="mb-5 text-primary text-center">Staff Member Login</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="py-3 text-center b-600 br-2 mb-2"
        placeholder="UserName"
        style={{
          fontSize: "1.2rem",
          border: "1px solid #81a31b",
          display: "block",
        }}
        type="text"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="py-3 text-center b-600 br-2 mb-3"
        placeholder="Password"
        style={{
          fontSize: "1.2rem",
          border: "1px solid #81a31b",
          display: "block",
        }}
        type="password"
      />
      <Button
        className="p-2 px-4 br-3 my-4 text-white "
        onClick={handleProviderLogin}
      >
        LOGIN
      </Button>
      <Button
        className="bg-black p-2 px-4 text-white"
        onClick={() => setLoginType(undefined)}
      >
        GO Back
      </Button>
    </div>
  );
};

export default StaffMember;