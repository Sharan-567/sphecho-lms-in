import React, { useState, useEffect, useCallback } from "react";
import OtpInput from "react-otp-input";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import authService from "../../services/auth.service";
import type { Patient } from "../../definations/patients";
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
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient>();

  const [error, setError] = useState("");
  const [hash, setHash] = useState("");
  const [token, setToken] = useState("");

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
          setStage("PATIENTS_LIST");
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
          await authService.AuthorizeLMS({ token, typeId: 6 });
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
            separator={<span> - </span>}
          />
        </>
      ) : null}

      {stage === "PATIENTS_LIST" ? (
        <div>
          <p className="b-500 my-1">Select the Patient</p>
          {(patientList || []).map((patient) => {
            return (
              <div
                className="bg-green p-3 br-1 text-white"
                style={{ cursor: "pointer" }}
                key={patient._id}
                onClick={() => setSelectedPatient(patient)}
              >
                <p>{patient.fullName}</p>
                <p>{patient.dob}</p>
              </div>
            );
          })}
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
