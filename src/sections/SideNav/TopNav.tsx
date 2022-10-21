import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  AiOutlineUser,
  AiOutlineNotification,
  AiOutlineComment,
  AiOutlineFire,
  AiOutlineTool,
  AiOutlineLogout,
  AiOutlineAccountBook,
} from "react-icons/ai";

const TopNav = () => {
  return (
    <Navbar bg="blue" variant="dark" className="py-3" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <h1 className="text-white b-700" style={{ fontSize: "2.2rem" }}>
            Specho
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle
          className="text-white"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav text-white">
          <Nav className="me-auto">
            <Nav.Link href="/">
              <div className="d-flex py-2">
                <AiOutlineFire color="white" size={22} />
                <h5 className="ms-2 text-white">Home</h5>
              </div>
            </Nav.Link>
            <Nav.Link href="courses">
              <div className="d-flex py-2">
                <AiOutlineAccountBook color="white" size={22} />
                <h5 className="ms-2 text-white">Courses</h5>
              </div>
            </Nav.Link>
            <Nav.Link href="webinars">
              <div className="d-flex py-2">
                <AiOutlineNotification color="white" size={22} />
                <h5 className="ms-2 text-white">Webinars</h5>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
