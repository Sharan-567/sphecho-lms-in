import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import authService from "../../services/auth.service";

type Usertype = "Patient" | "Provider" | "SuperUser";
type Props = {
  setLoginType: React.Dispatch<React.SetStateAction<Usertype | undefined>>;
};

type DataType = {
  phone: string;
  usertype: string;
};
type StageType = "NUMBER" | "OTP" | "PATIENTS_LIST";

const PatientLogin = ({ setLoginType }: Props) => {
  const [stage, setStage] = useState<StageType>("NUMBER");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [data, setData] = useState({ usertype: "", phone: "" });

  const [error, setError] = useState("");

  useEffect(() => {
    if (otp.length === 4) {
      const body = {
        name: data.usertype,
        mobile: data.phone,
        otp: otp,
      };
    }
  }, [otp]);

  const handleGetOTP = async () => {
    // authService.getOTP(number, "patient");
  };

  return (
    <div className="p-2 w-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-5 text-primary text-center">Patient Login</h1>
      {error ? <p className="text-danger">{error}</p> : null}
      {stage === "NUMBER" ? (
        <>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="py-3 text-center b-600 br-2"
            placeholder="Mobile Number"
            style={{
              fontSize: "1.2rem",
              border: "1px solid #81a31b",
              display: "block",
            }}
            type="tel"
          />
          <Button
            className="p-2 px-4 br-3 mt-4 text-white "
            onClick={handleGetOTP}
          >
            GET OTP
          </Button>
        </>
      ) : null}
      {stage === "OTP" ? (
        <>
          <p className="my-1 b-500">Please Enter the Otp</p>
          <OtpInput
            containerStyle={{ padding: "1rem" }}
            inputStyle={{ padding: ".5rem", width: "3rem" }}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            separator={<span>-</span>}
          />
        </>
      ) : null}

      {stage === "PATIENTS_LIST" ? (
        <div>
          <p className="b-500 my-1">Select the User Type</p>
        </div>
      ) : null}

      {stage !== "NUMBER" ? (
        <Button
          className="bg-black p-2 px-4 mt-4 text-white"
          onClick={() => setLoginType(undefined)}
        >
          Try Again
        </Button>
      ) : null}
    </div>
  );
};
export default PatientLogin;
