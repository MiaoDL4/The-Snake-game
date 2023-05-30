import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Play = () => {
  return (
    <Container>
      <Row>
        <Col as={Link} to="/solo">solo</Col>
        <Col as={Link} to="/multi">Mulit</Col>
      </Row>
    </Container>
  );
};

export default Play;
