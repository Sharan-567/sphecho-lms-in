import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
    AiOutlineUser,
    AiOutlineNotification,
    AiOutlineComment,
    AiOutlineFire,
    AiOutlineTool,
    AiOutlineHome,
    AiOutlinePercentage,
    AiOutlineSafety,
  AiOutlineLogout,
  AiOutlineAccountBook,
  AiOutlineShopping,
  AiOutlineFileProtect,
  AiOutlineCalculator,
} from "react-icons/ai";

import {logout} from '../../features/auth'
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";

const AdminTopNav = () => {

const dispatch = useAppDispatch();
const logoutHandler = () => {
  dispatch(logout());
};

  return (
    <Navbar bg="primary" variant="dark" className="py-3" expand="lg">
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
            <Nav.Link as={Link} to="/admin">
              <div className="d-flex py-2">
                <AiOutlineHome color="white" size={22} />
                <h5 className="ms-2 text-white">Dashboard</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/userMangement">
              <div className="d-flex py-2">
                <AiOutlineUser color="white" size={22} />
                <h5 className="ms-2 text-white">Users</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/coursesMangement">
              <div className="d-flex py-2">
                <AiOutlineFire color="white" size={22} />
                <h5 className="ms-2 text-white">Courses</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/topicsMangement">
              <div className="d-flex py-2">
                <AiOutlineNotification color="white" size={22} />
                <h5 className="ms-2 text-white">Topics</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/assessmentMangement">
              <div className="d-flex py-2">
                <AiOutlinePercentage color="white" size={22} />
                <h5 className="ms-2 text-white">Assessment</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/questionMangement">
              <div className="d-flex py-2">
                <AiOutlineTool color="white" size={22} />
                <h5 className="ms-2 text-white">Questions</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/badgeMangement">
              <div className="d-flex py-2">
                <AiOutlineSafety color="white" size={22} />
                <h5 className="ms-2 text-white">Badges</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/certificationMangement">
              <div className="d-flex py-2">
                <AiOutlineComment color="white" size={22} />
                <h5 className="ms-2 text-white">Certification</h5>
              </div>
            </Nav.Link>
            <Nav.Link onClick={logoutHandler}>
              <div className="d-flex py-2">
                <AiOutlineLogout color="white" size={22} />
                <h5 className="ms-2 text-white b-700">LOGOUT</h5>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminTopNav;
