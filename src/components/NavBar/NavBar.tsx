import React, { useEffect, useRef, useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import propTypes from "prop-types";
import "./NavBar.scss";
import logo from "../../assets/s-logo.png";
import LoginModal from "../../modals/LoginModal";

type navBarProps = {
  showLogo?: boolean;
};

const NavBar = ({ showLogo = true }: navBarProps) => {
  const [showNav, setShowNav] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navElement = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => setShowLoginModal(false);
  const handleOpenModel = () => setShowLoginModal(true);

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
                    className="bg-green text-white px-3 b-o-none "
                    onClick={handleOpenModel}
                  >
                    Sign up / Login
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
      {/* login modal */}
      {/* <LoginModal {...{ handleOpenModel, handleCloseModal, showLoginModal }} /> */}
    </>
  );
};

NavBar.prototypes = {
  showLogo: propTypes.bool,
};

export default NavBar;
