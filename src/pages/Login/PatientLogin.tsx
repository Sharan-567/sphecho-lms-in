import React, { useState, useEffect, useCallback } from "react";
import OtpInput from "react-otp-input";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import authService from "../../services/auth.service";
import type { Patient } from "../../definations/patients";
import NewPatient from "./NewPatient";
import { makeLogin } from "../../features/auth";
type Usertype = "Patient" | "Provider" | "SuperUser";
type Props = {
  setLoginType: React.Dispatch<React.SetStateAction<UserState | undefined>>;
};

type DataType = {
  phone: string;
  userState: string;
};
type StageType = "NUMBER" | "OTP" | "PATIENTS_LIST";

const PatientLogin = ({ setLoginType }: Props) => {
  const [stage, setStage] = useState<StageType>("NUMBER");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [data, setData] = useState({ usertype: "", phone: "" });
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [otpError, setOtpError] = useState("");
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [hash, setHash] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyOtp = async () => {
      if (otp.length === 4) {
        try {
          const { token } = await authService.verifyOTP({
            name: "patient",
            hashcode: hash,
            mobile: number,
            otp,
          });
          setToken(token);
          if (token) {
            setOtpError("");
            setStage("PATIENTS_LIST");
          } else {
            setOtpError("Invalid Otp");
          }
          const { patients } = await authService.GetPatientList(number, token);
          setPatientList(patients);
        } catch (err) {
          setError(err);
          console.log(err);
        }
      }
    };
    verifyOtp();
  }, [otp]);

  useEffect(() => {
    const verifyPatient = async () => {
      try {
        if (selectedPatient) {
          const { token } = await authService.verifyPatient(selectedPatient);
          if (token) {
            dispatch(makeLogin());
            localStorage.setItem("token", token);
            localStorage.setItem("userState", "patient");
            navigate("/");
          }
        }
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
    verifyPatient();
  }, [selectedPatient]);

  const handleGetOTP = useCallback(() => {
    authService
      .getOTP(number, "patient")
      .then((res) => {
        setHash(res.hash);
        setStage("OTP");
      })
      .catch((err) => setError(err));
  }, [number]);

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
            maxLength={10}
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
          {token ? <p></p> : <p className="text-danger">{otpError}</p>}
          <p className="my-1 b-500">Please Enter the Otp</p>
          <OtpInput
            containerStyle={{ padding: "1rem" }}
            inputStyle={{ padding: ".5rem", width: "3rem" }}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            separator={<span> - </span>}
          />
        </>
      ) : null}

      {stage === "PATIENTS_LIST" ? (
        <div>
          {patientList.length > 0 ? (
            <>
              <p className="b-500 my-1">Select the Patient</p>
              {(patientList || []).map((patient) => {
                return (
                  <div
                    className="bg-green my-2 p-3 br-1 text-white"
                    style={{ cursor: "pointer" }}
                    key={patient._id}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <p>{patient.fullName}</p>
                    <p>{patient.dob}</p>
                  </div>
                );
              })}
            </>
          ) : (
            <NewPatient
              mobile={number}
              setSelectedPatient={setSelectedPatient}
            />
          )}
        </div>
      ) : null}

      <Button
        className="bg-black p-2 px-4 mt-4 text-white"
        onClick={() => setLoginType(undefined)}
      >
        Go Back
      </Button>
    </div>
  );
};
export default PatientLogin;
