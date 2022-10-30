import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Modal, Form, Spinner, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store";
import { login, clearError } from "../features/auth";

type Props = {
  handleOpenModel: () => void;
  handleCloseModal: () => void;
  showLoginModal: boolean;
  getUserType: React.Dispatch<React.SetStateAction<string>>;
  userType: string;
};

const SimpleLoginModal = ({
  handleCloseModal,
  showLoginModal,
  handleOpenModel,
  getUserType,
  userType,
}: Props) => {
  const [startSpin, setStartSpin] = useState(false);
  const { err } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup
      .string()
      .required("No password provided.")
      .min(3, "Password is too short - should be 8 chars minimum."),
  });

  const handleSubmit = (data: { username: string; password: string }) => {
    dispatch(login({ ...data, type: userType }))
      .unwrap()
      .then((res) => {
        setStartSpin(false);
      })
      .catch((err) => setStartSpin(false));
  };
  return (
    <Modal
      centered
      show={showLoginModal}
      onHide={() => {
        handleCloseModal();
        getUserType("");
        dispatch(clearError());
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {userType.charAt(0).toUpperCase() + userType.slice(1)} Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <p className="text-danger">{err}</p>}
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            username: "",
            password: "",
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
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik04">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.password}
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
                    handleCloseModal();
                    getUserType("");
                    dispatch(clearError());
                  }}
                >
                  Close
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default SimpleLoginModal;
