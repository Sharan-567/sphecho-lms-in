import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import colorLogo from "../../assets/clogo.png";

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
          <img src={colorLogo} width={"150rem"} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto pt-2 ">
            <Nav.Link href="#feature-courses" className="b-700 link-nav">
              <a
                href="/features"
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                <p>FEATURED COURSES</p>
              </a>
            </Nav.Link>
            <Nav.Link className=" b-700 link-nav">
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "black",
                }}
                to="/webinar"
              >
                <p>WEBINARS</p>
              </Link>
            </Nav.Link>
            <Nav.Link className="b-700 link-nav">
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "black",
                }}
                to="/login"
              >
                <p>LOGIN</p>
              </Link>
            </Nav.Link>

            {/* <Nav.Link
              className="b-700 link-nav"
              
            >
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
                to="/register"
              >
                <p>REGISTER</p>
              </Link>
            </Nav.Link> */}
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
    <Container style={{ padding: "0rem 1rem", background: "white" }}>
      <Navbar.Brand as={Link} to="/">
        <img src={colorLogo} width={"135rem"} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto" style={{ padding: "1rem" }}>
          <Nav.Link
            className="b-700 ps-2 mt-3 link-nav"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Link style={{ textDecoration: "none" }} to="/features">
              FEATURED COURSES
            </Link>
          </Nav.Link>
          <Nav.Link
            className=" b-700 ps-2 mt-3 link-nav"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Link style={{ textDecoration: "none" }} to="/webinar">
              WEBINARS
            </Link>
          </Nav.Link>
          <Nav.Link
            className="b-700 ps-2 mt-3 link-nav"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Link style={{ textDecoration: "none" }} to="/login">
              LOGIN
            </Link>
          </Nav.Link>
          {/* <Nav.Link className="b-700 link-nav" style={{ color: "black" }}>
            <Link style={{ textDecoration: "none" }} to="/login">
              REGISTER
            </Link>
          </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBarTop;
