import React, { useEffect, useRef, useState } from "react";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Modal,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import propTypes from "prop-types";

import { login } from "../../features/auth";
import "./NavBar.scss";
import logo from "../../assets/s-logo.png";
import { useAppDispatch, useAppSelector } from "../../store";

type navBarProps = {
  showLogo?: boolean;
};

const NavBar = ({ showLogo = true }: navBarProps) => {
  const navElement = useRef<HTMLDivElement>();
  const [showNav, setShowNav] = useState(false);
  const [startSpin, setStartSpin] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useAppDispatch();
  const { err } = useAppSelector((state) => state.auth);

  const handleCloseModal = () => setShowLoginModal(false);
  const handleOpenModel = () => setShowLoginModal(true);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("No password provided.")
      .min(3, "Password is too short - should be 8 chars minimum."),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNav);
    }
    return () => window.removeEventListener("scroll", controlNav);
  }, []);

  const controlNav = () => {
    if (typeof window !== "undefined") {
      const heightOfNav = navElement?.current?.getBoundingClientRect().height;
      if (heightOfNav) {
        if (window.scrollY > heightOfNav) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }
    }
  };

  const handleSubmit = ({ email, password }) => {
    setStartSpin(true);
    const data = new FormData();
    data.append("username", email);
    data.append("password", password);
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        setStartSpin(false);
      })
      .catch((err) => setStartSpin(false));
  };

  return (
    <>
      <div ref={navElement} className="c">
        <div>
          <Navbar
            className={`bottom-nav-bar py-3 ${showNav && "showNav"}`}
            expand="lg"
          >
            <Container>
              <Navbar.Brand href="/" className="position-relative">
                {showLogo && <img src={logo} className="logo" />}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <NavDropdown
                    className="mr-5 c-nav-drop"
                    title="HOME"
                    id="home"
                  >
                    <NavDropdown.Item
                      className="c-drop-item"
                      href="#action/3.1"
                    >
                      About us
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="c-drop-item"
                      href="#action/3.2"
                    >
                      FAQs
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="c-drop-item"
                      href="#action/3.2"
                    >
                      The SPHECHO board
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Item className="c-nav-drop">
                    <Nav.Link className="link" href="/courses">
                      COURSES
                    </Nav.Link>
                  </Nav.Item>

                  <NavDropdown
                    className="mr-5 c-nav-drop"
                    title="FEATURES"
                    id="features"
                  >
                    <NavDropdown.Item
                      className="c-drop-item"
                      href="#action/3.1"
                    >
                      Research and publication
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="c-drop-item"
                      href="/resourceHub"
                    >
                      Library
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="c-drop-item"
                      href="#action/3.2"
                    >
                      How can I contribute
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    className="mr-5 c-nav-drop"
                    title="CONTACT US"
                    id="contact"
                  >
                    <NavDropdown.Item
                      className="c-drop-item"
                      href="#action/3.1"
                    >
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="c-drop-item"
                      href="#action/3.2"
                    >
                      Another action
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Button
                    className="bg-graydark text-black px-3 me-3 border"
                    onClick={handleOpenModel}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-green text-white px-3 b-o-none "
                    onClick={handleOpenModel}
                  >
                    Sign up
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
      {/* login modal */}
      <Modal centered show={showLoginModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {err && <p className="text-danger">{err}</p>}
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              email: "",
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
                <Form.Group className="mb-2" controlId="validationFormik05">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@mail.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="validationFormik04">
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
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

NavBar.prototypes = {
  showLogo: propTypes.bool,
};

export default NavBar;
