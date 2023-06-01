import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Play = () => {
  return (
    <>
    <Container style={{ height: "75dvh" }} className="d-flex flex-column">
      <Row className="h-100 py-5 ">
        <Col
          className="bg-secondary d-flex justify-content-center align-items-center mx-5 rounded-4"
          as={Link}
          to="/Solo"
        >
          <h1 className="">Solo</h1>
        </Col>
        <Col
          className="bg-warning d-flex justify-content-center align-items-center mx-5 rounded-4"
          as={Link}
          to="/vs"
        >
          <h1 className="">VS</h1>
        </Col>
      </Row>
    </Container>
  </>
  );
};

export default Play;
