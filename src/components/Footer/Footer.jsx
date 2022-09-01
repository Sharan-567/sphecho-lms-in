import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import flr from "../../assets/flower.png";
import "./Footer.scss";
const Footer = ({ color }) => {
  return (
    <footer>
      <Row>
        <Col sm={2}></Col>
        <Col sm={6} className="f-container-1 p-5">
          <img src={flr} className="flr-img" />
          <p className="p-sm-5">
            Subscribe now and recive weekly newsletter with Educational
            materials, new courses, interesting posts, popular books and much
            more!
          </p>
        </Col>
        <Col
          sm={4}
          className="d-flex align-items-center justify-content-center"
        >
          <Form className="d-flex align-items-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Your Email Here" />
            </Form.Group>
            <Button
              className="mybtn"
              style={{ backgroundColor: color }}
              type="submit"
            >
              Subscribe
            </Button>
          </Form>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
