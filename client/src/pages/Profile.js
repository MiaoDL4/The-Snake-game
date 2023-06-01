import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user);
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <Container className="py-5">
        <Row className="pb-2">
          <Col className="text-center">
            <Card className="bg-primary rounded-4">
              <Card.Header>
                <h4>Username</h4>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <h2>{user.username}</h2>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="">
          <Col md={6} sm={12} className="text-center py-2">
            <Card className="bg-primary rounded-4">
              <Card.Header>
                <h4>Wins</h4>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <h2>{user.wins}</h2>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} sm={12} className="text-center py-2">
            <Card className="bg-primary rounded-4">
              <Card.Header>
                <h4>Losses</h4>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <h2>{user.losses}</h2>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="py-2">
          <Col>
            <Card className="bg-primary rounded-4">
              <Card.Header>
                <h4 className="text-start">Inventory</h4>
              </Card.Header>
              <Card.Body>
                <Card.Title className="pb-1">
                  <h5>Currency: {user.currency}</h5>
                </Card.Title>
                <Row>
                  {user.inventory.map((item) => (
                    <Col md={4} sm={12} className="">
                      <ul className="bg-info py-2 px-2 rounded-3">
                        <dt>{item.merch.name}</dt>
                        <dd>Description: {item.merch.description}</dd>
                      </ul>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
