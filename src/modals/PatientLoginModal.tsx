import React, { useState } from "react";
import { Formik } from "formik";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { getOTP, verifyOTP } from "../features/auth";
import { useAppDispatch } from "../store";

type Props = {
  handleOpenModel: () => void;
  handleCloseModal: () => void;
  showLoginModal: boolean;
  getUserType: React.Dispatch<React.SetStateAction<string>>;
};

const PatientLoginModal = ({
  showLoginModal,
  handleCloseModal,
  getUserType,
}: Props) => {
  const [startSpin, setStartSpin] = useState(false);
  const [showOtpPanel, setOtpPanel] = useState(false);

  const [otpError, setOtpError] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: { phone: string; usertype: string }) => {
    const body = {
      mobile: data.phone,
      name: data.usertype,
      otp,
    };
    try {
      const otpRes = await dispatch(getOTP(data)).unwrap();
      setOtpPanel(true);
      await dispatch(verifyOTP({ ...body, hash: otpRes.hash }));
    } catch (err) {
      setOtpError(err);
    }
  };
  return (
    <Modal
      centered
      show={showLoginModal}
      onHide={() => {
        getUserType("SuperUser");
        handleCloseModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Patient Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {otpError && <p className="text-danger">{otpError}</p>}
        {showOtpPanel ? (
          <div className=" p-4 text-center">
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
              {otp.length === 4 && (
                <div className="d-flex align-items-center mt-2">
                  <Spinner animation="grow" variant="green" />{" "}
                  <p className="ms-2 mt-2">Please wait a moment...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Formik
            //   validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              phone: "",
              usertype: "patient",
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

                <Form.Group className="mb-3">
                  <Form.Label>User type</Form.Label>
                  <Form.Select
                    value={values.usertype}
                    name="usertype"
                    onChange={(e) => {
                      handleChange(e);
                      getUserType(e.target.value);
                    }}
                    aria-label="Default select example"
                  >
                    <option value="SuperUser">SuperUser</option>
                    <option value="patient">Patient</option>
                  </Form.Select>
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
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PatientLoginModal;
