import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/sphechoLogo.png";
import { Container } from "react-bootstrap";
import colorLogo from "../../assets/colorlogo.png";

const NavBarTop = () => {
  const [navColor, setNavColor] = React.useState("transparent");
  let location = useLocation();
  const [isDark, setIsDark] = React.useState(false);
  const isSmallScreen = window.screen.width < 690;

  React.useEffect(() => {
    const currentPath = location.pathname;
    if (
      currentPath === "/webinar" ||
      currentPath === "/features" ||
      currentPath === "/privacy"
    ) {
      setIsDark(true);
    }
  }, []);

  window.onscroll = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      setNavColor("white");
    } else {
      setNavColor("transparent");
    }
  };

  console.log(isSmallScreen);

  return isSmallScreen ? (
    <SmallNavBar isDark={isDark} />
  ) : (
    <NavBar isDark={isDark} />
  );
};

const NavBar = ({ isDark }) => (
  <Navbar
    className="nav-bar-container"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    }}
    expand="lg"
  >
    <Container>
      <Navbar.Brand as={Link} to="/">
        <img
          src={isDark ? colorLogo : logo}
          width={isDark ? "135rem" : "165rem"}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            className="b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            <Link
              style={{ textDecoration: "none", fontSize: "1.4rem" }}
              to="/login"
            >
              BLACKBOARD
            </Link>
          </Nav.Link>
          <Nav.Link
            className=" b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            <Link
              style={{ textDecoration: "none", fontSize: "1.4rem" }}
              to="/webinar"
            >
              WEBINAR
            </Link>
          </Nav.Link>
          <Nav.Link
            className="b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            <Link
              style={{ textDecoration: "none", fontSize: "1.4rem" }}
              to="/features"
            >
              FEATURES
            </Link>
          </Nav.Link>

          <Nav.Link
            className="b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            <Link
              style={{ textDecoration: "none", fontSize: "1.4rem" }}
              to="/privacy"
            >
              PRIVACY
            </Link>
          </Nav.Link>
          <Nav.Link
            className="b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            <Link
              style={{ textDecoration: "none", fontSize: "1.4rem" }}
              to="/login"
            >
              LOGIN
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const SmallNavBar = ({ isDark }) => (
  <Navbar
    className="nav-bar-container"
    style={{
      position: "sticky",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "white",
    }}
    expand="lg"
  >
    <Container style={{ padding: "0rem 1rem" }}>
      <Navbar.Brand as={Link} to="/">
        <img src={colorLogo} width={"135rem"} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto" style={{ padding: "1rem" }}>
          <Nav.Link
            className="b-700 link-nav"
            style={{ color: "#97d25a", textDecoration: "none" }}
          >
            <Link style={{ textDecoration: "none" }} to="/login">
              BLACKBOARD
            </Link>
          </Nav.Link>
          <Nav.Link
            className=" b-700 link-nav"
            style={{ color: "#97d25a", textDecoration: "none" }}
          >
            <Link style={{ textDecoration: "none" }} to="/webinar">
              WEBINAR
            </Link>
          </Nav.Link>
          <Nav.Link
            className="b-700 link-nav"
            style={{ color: "#97d25a", textDecoration: "none" }}
          >
            <Link style={{ textDecoration: "none" }} to="/features">
              FEATURES
            </Link>
          </Nav.Link>
          <Nav.Link className="b-700 link-nav" style={{ color: "#97d25a" }}>
            <Link style={{ textDecoration: "none" }} to="/privacy">
              PRIVACY
            </Link>
          </Nav.Link>
          <Nav.Link className="b-700 link-nav" style={{ color: "#97d25a" }}>
            <Link style={{ textDecoration: "none" }} to="/login">
              LOGIN
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBarTop;
