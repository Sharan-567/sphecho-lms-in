import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo-g.png";
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

const NavBar = ({ isDark }) => {
  const [navColor, setNavColor] = React.useState("transparent");
  React.useEffect(() => {
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
  });

  return (
    <Navbar
      className="nav-bar-container"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: navColor,
        boxShadow:
          navColor === "white" ? "0 0 20px 10px rgba(0,0,0,0.1)" : "inherit",
      }}
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={isDark ? colorLogo : logo} width={"45rem"} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              className="b-700 link-nav"
              style={{ color: isDark ? "#69B447" : "black" }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
                to="/login"
              >
                <p>BLACKBOARD</p>
              </Link>
            </Nav.Link>
            <Nav.Link
              className=" b-700 link-nav"
              style={{ color: isDark ? "#69B447" : "black" }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
                to="/webinar"
              >
                <p>WEBINAR</p>
              </Link>
            </Nav.Link>
            <Nav.Link
              className="b-700 link-nav"
              style={{ color: isDark ? "#69B447" : "black" }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
                to="/features"
              >
                <p>FEATURES</p>
              </Link>
            </Nav.Link>

            <Nav.Link
              className="b-700 link-nav"
              style={{ color: isDark ? "#69B447" : "black" }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
                to="/privacy"
              >
                <p>PRIVACY</p>
              </Link>
            </Nav.Link>
            <Nav.Link
              className="b-700 link-nav"
              style={{ color: isDark ? "#69B447" : "black" }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
                to="/login"
              >
                <p>LOGIN</p>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

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
            style={{ color: "#69B447", textDecoration: "none" }}
          >
            <Link style={{ textDecoration: "none" }} to="/login">
              BLACKBOARD
            </Link>
          </Nav.Link>
          <Nav.Link
            className=" b-700 link-nav"
            style={{ color: "#69B447", textDecoration: "none" }}
          >
            <Link style={{ textDecoration: "none" }} to="/webinar">
              WEBINAR
            </Link>
          </Nav.Link>
          <Nav.Link
            className="b-700 link-nav"
            style={{ color: "#69B447", textDecoration: "none" }}
          >
            <Link style={{ textDecoration: "none" }} to="/features">
              FEATURES
            </Link>
          </Nav.Link>
          <Nav.Link className="b-700 link-nav" style={{ color: "#69B447" }}>
            <Link style={{ textDecoration: "none" }} to="/privacy">
              PRIVACY
            </Link>
          </Nav.Link>
          <Nav.Link className="b-700 link-nav" style={{ color: "#69B447" }}>
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
