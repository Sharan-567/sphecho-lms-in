import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth";
import { useAppDispatch, useAppSelector } from "../../store";

type Props = {
  setLoginType: React.Dispatch<React.SetStateAction<Usertype | undefined>>;
};

const ProviderLogin = ({ setLoginType }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { err: error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleProviderLogin = () => {
    dispatch(login({ username, password, type: "doctor" }))
      .unwrap()
      .then((res) => {
        navigate("/");
      });
  };

  return (
    <div className="p-2 w-100 d-flex flex-column justify-content-center align-items-center">
      {error ? <p className="text-danger">{error}</p> : null}
      <h1 className="mb-5 text-primary text-center">Provider Login</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="py-3 text-center b-600 br-2 mb-2"
        placeholder="Mobile Number"
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
        placeholder="Mobile Number"
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

export default ProviderLogin;
