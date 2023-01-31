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
            as={Link}
            to="/"
            className="b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            BLACKBOARD
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/webinar"
            className=" b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            WEBINARS
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/features"
            className="b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            FEATURES
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/"
            className="b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            SUPPORT
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/privacy"
            className="b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            PRIVACY
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="login"
            className="b-700 link-nav"
            style={{ color: isDark ? "#97d25a" : "white" }}
          >
            LOGIN
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
            as={Link}
            to="/"
            className="b-700 link-nav"
            style={{ color: "#97d25a" }}
          >
            BLACKBOARD
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/webinar"
            className=" b-700 link-nav"
            style={{ color: "#97d25a" }}
          >
            WEBINARS
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/features"
            className="b-700 link-nav"
            style={{ color: "#97d25a" }}
          >
            FEATURES
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/"
            className="b-700 link-nav"
            style={{ color: "#97d25a" }}
          >
            SUPPORT
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/privacy"
            className="b-700 link-nav"
            style={{ color: "#97d25a" }}
          >
            SUPPORT
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="login"
            className="b-700 link-nav"
            style={{ color: "#97d25a" }}
          >
            LOGIN
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBarTop;
