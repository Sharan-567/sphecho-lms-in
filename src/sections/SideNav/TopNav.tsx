import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  AiOutlineTool,
  AiOutlineLogout,
  AiOutlineAccountBook,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineComment,
  AiOutlineFire,
  AiOutlineFileProtect,
  AiOutlineCalculator,
} from "react-icons/ai";
import {logout} from '../../features/auth'
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";

const TopNav = () => {

const dispatch = useAppDispatch();
const logoutHandler = () => {
  dispatch(logout());
};

const isAdmin = () => {
  const userType = localStorage.getItem("userType");
  const typeId = localStorage.getItem("typeId");
  if (userType && typeId) {
    if (userType === "doctor" || typeId === "2") {
      return true;
    } else if (userType === "superadmin" || typeId === "4") {
      return true;
    }
  }
  return false;
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
            <Nav.Link as={Link} to="/">
              <div className="d-flex py-2">
                <AiOutlineFire color="white" size={22} />
                <h5 className="ms-2 text-white">Home</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="courses">
              <div className="d-flex py-2">
                <AiOutlineFileProtect color="white" size={22} />
                <h5 className="ms-2 text-white">Courses</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="certification">
              <div className="d-flex py-2">
                <AiOutlineAccountBook color="white" size={22} />
                <h5 className="ms-2 text-white">certification</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="webinars">
              <div className="d-flex py-2">
                <AiOutlineComment color="white" size={22} />
                <h5 className="ms-2 text-white">Webinars</h5>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="cart">
              <div className="d-flex py-2">
                <AiOutlineShopping color="white" size={22} />
                <h5 className="ms-2 text-white">Cart</h5>
              </div>
            </Nav.Link>
            {isAdmin() ? <Nav.Link as={Link} to="admin">
              <div className="d-flex py-2">
                <AiOutlineTool color="white" size={22} />
                <h5 className="ms-2 text-white">Go to Admin</h5>
              </div>
            </Nav.Link>: null}
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

export default TopNav;
