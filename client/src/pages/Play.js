import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
const Play = () => {
  return (
    <>
      <Container style={{ height: "75dvh" }} className="d-flex flex-column">
        <Row className="h-100 py-5 ">
          <Col md={6} sm={12} as={Link} to="/Solo">
            <Button variant="outline-secondary" className=" d-flex justify-content-center align-items-center mx-2 rounded-4 h-75 w-100">
              SOLO
            </Button>
          </Col>
          <Col md={6} sm={12} as={Link} to="/vs">
            <Button variant="outline-danger" className="d-flex justify-content-center align-items-center mx-2 rounded-4 h-75 w-100">
              VS
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Play;
