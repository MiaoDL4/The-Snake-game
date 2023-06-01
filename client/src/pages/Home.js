import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col as={Link} to="/me">Proflie</Col>
        <Col as={Link} to="/play">play</Col>
        <Col as={Link} to="/shop">Shop</Col>
      </Row>
    </Container>
  );
};

export default Home;
