import React, { useEffect, useRef, useState } from "react";
import { Nav, Dropdown, Navbar, Container, NavDropdown } from "react-bootstrap";
import propTypes from "prop-types";
import "./NavBar.scss";
import logo from "../../assets/s-logo.png";

const NavBar = ({ showLogo }) => {
  const navElement = useRef();
  const [showNav, setShowNav] = useState(false);

  const controlNav = (e) => {
    if (typeof window !== "undefined") {
      const heightOfNav = navElement.current.getBoundingClientRect().height;
      if (window.scrollY > heightOfNav) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNav);
    }
    return () => window.removeEventListener("scroll", controlNav);
  }, []);

  return (
    <div ref={navElement} className="c">
      <div className="t-menu">
        <Container className="d-flex fluid justify-content-between">
          <Dropdown>
            <Dropdown.Toggle id="lang-dropdown">English</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="">Japanies</Dropdown.Item>
              <Dropdown.Item href="">Spanish</Dropdown.Item>
              <Dropdown.Item href="">italin</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link className="link" eventKey="link-2" href="">
                My BlackBoard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="link" eventKey="link-3" href="">
                Login / Register
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>
      <div>
        <Navbar
          className={`bottom-nav-bar ${showNav && "showNav"}`}
          expand="lg"
        >
          <Container>
            <Navbar.Brand href="/" className="position-relative">
              {showLogo && <img src={logo} className="logo" />}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavDropdown className="mr-5 c-nav-drop" title="HOME" id="home">
                  <NavDropdown.Item className="c-drop-item" href="#action/3.1">
                    About us
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="#action/3.2">
                    FAQs
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="#action/3.2">
                    The SPHECHO board
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  className="mr-5 c-nav-drop"
                  title="COURSES"
                  id="home"
                >
                  <NavDropdown.Item className="c-drop-item" href="#action/3.1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  className="mr-5 c-nav-drop"
                  title="FEATURES"
                  id="features"
                >
                  <NavDropdown.Item className="c-drop-item" href="#action/3.1">
                    Research and publication
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="/resourceHub">
                    Library
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="#action/3.2">
                    How can I contribute
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className="mr-5 c-nav-drop"
                  title="CONTACT US"
                  id="contact"
                >
                  <NavDropdown.Item className="c-drop-item" href="#action/3.1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

NavBar.prototypes = {
  showLogo: propTypes.bool,
};

export default NavBar;
