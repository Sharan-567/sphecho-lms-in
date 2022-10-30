import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

const AdminMain = () => {
  const navigate = useNavigate()
  return (
    <div className="container p-3">
      <Row>
        <Col>
          <div>
            <Button
            onClick={() => navigate('/')}
              className="bg-green text-white"
              style={{ borderRadius: "2rem" }}
            >
              Go to LMS
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminMain;
