import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useRef, useState } from "react";
import { Nav, Dropdown, Navbar, Container, NavDropdown } from "react-bootstrap";
import "./NavBar.scss";

const NavBar = () => {
  const navElement = useRef();
  const [showNav, setShowNav] = useState(false);

  const controlNav = (e) => {
    if (typeof window !== "undefined") {
      const heightOfNav = navElement.current.getBoundingClientRect().height;
      if (window.scrollY > heightOfNav) {
        setShowNav(true);
        console.log("show");
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
              <Nav.Link href="/home" className="link" eventKey="link-1" href="">
                Contact Number
              </Nav.Link>
            </Nav.Item>
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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavDropdown className="mr-5 c-nav-drop" title="HOME" id="home">
                  <NavDropdown.Item className="c-drop-item" href="#action/3.1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="#action/3.2">
                    Another action
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
                  title="FEATUES"
                  id="features"
                >
                  <NavDropdown.Item className="c-drop-item" href="#action/3.1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item className="c-drop-item" href="#action/3.2">
                    Another action
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

export default NavBar;
