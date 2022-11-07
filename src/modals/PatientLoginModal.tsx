import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { getOTP, verifyOTP, verifyPatientName } from "../features/auth";
import { useAppDispatch, useAppSelector } from "../store";
import { Patient } from "../definations/patients";
import { resetStage } from "../features/patient";

type Props = {
  handleOpenModel: () => void;
  handleCloseModal: () => void;
  showLoginModal: boolean;
  getUserType: React.Dispatch<React.SetStateAction<string>>;
};

type DataType = {
  phone: string;
  usertype: string;
};

const PatientLoginModal = ({
  showLoginModal,
  handleCloseModal,
  getUserType,
}: Props) => {
  const [startSpin, setStartSpin] = useState(false);
  const [showOtpPanel, setOtpPanel] = useState(false);
  const { patients, error, stage } = useAppSelector((state) => state.patient);

  const [otpError, setOtpError] = useState("");
  const [otp, setOtp] = useState("");
  const [data, setData] = useState({ usertype: "", phone: "" });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (otp.length === 4) {
      const body = {
        name: data.usertype,
        mobile: data.phone,
        otp: otp,
      };
      dispatch(verifyOTP(body));
      setOtp("");
    }
  }, [otp]);

  const handleSubmit = async (data: { phone: string; usertype: string }) => {
    setData(data as DataType);
    try {
      dispatch(getOTP(data));
      setOtpPanel(true);
    } catch (err) {
      setOtpError(err);
    }
  };

  const handlePatientLogin = (patient: Patient) => {
    dispatch(verifyPatientName(patient));
  };

  return (
    <Modal
      centered
      style={{ zoom: 1.1 }}
      show={showLoginModal}
      onHide={() => {
        getUserType("");
        dispatch(resetStage());
        handleCloseModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Independent user Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {stage === 0 && (
          <Formik
            //   validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              phone: "",
              usertype: "Patient",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationFormik05">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Phone no."
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex flex-row-reverse mt-5">
                  <Button type="submit" variant="green text-white">
                    {startSpin ? (
                      <Spinner
                        style={{
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "50%",
                        }}
                        className="mx-2"
                        animation="border"
                        variant="white"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      dispatch(resetStage());
                      handleCloseModal();
                      getUserType("");
                    }}
                  >
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {stage === 1 && (
          <div className="py-4 w-100 d-flex flex-column align-items-center">
            <h4>Please Enter the Otp</h4>
            <OtpInput
              containerStyle={{ padding: "1rem" }}
              inputStyle={{ padding: ".5rem", width: "3rem" }}
              value={otp}
              onChange={setOtp}
              numInputs={4}
              separator={<span>-</span>}
            />
            {error ? (
              <div>
                <p>{error}</p>
                <Button
                  className="bg-green text-white"
                  onClick={() => dispatch(resetStage())}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              otp.length === 4 && (
                <div>
                  <Spinner animation="grow" color="green"></Spinner>
                  <p>please wait a moment</p>
                </div>
              )
            )}
          </div>
        )}
        {stage === 3 && (
          <>
            {error && (
              <div>
                <p className="text-danger">{error}</p>
                <Button
                  className="bg-green text-white"
                  onClick={() => dispatch(resetStage())}
                >
                  Try Again
                </Button>
              </div>
            )}
            {patients.map((p) => (
              <Button
                onClick={() => handlePatientLogin(p)}
                key={p._id}
                className="p-2 bg-gray br-1 w-100"
              >
                {p.fName}
              </Button>
            ))}
          </>
        )}
        {stage === 4 && error && (
          <>
            <div>
              <p className="text-danger">{error}</p>
              <Button
                className="bg-green text-white"
                onClick={() => dispatch(resetStage())}
              >
                Try Again
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PatientLoginModal;
