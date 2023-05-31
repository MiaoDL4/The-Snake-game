import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <Container>
        <Row>
          <Col>Username: {user.username}</Col>
        </Row>
        <Row>
          <Col>wins: {user.wins}</Col>
          <Col>losses: {user.losses}</Col>
        </Row>
        <Row>
          <Col>
          inventory
          </Col>
          <Col>
          currency: {user.currecy}
          </Col>
        </Row>
        <Row>
          {user.inventory.map((item) => (
            <Col>
              <div>purchase date: {item.purchaseDate}</div>
              <div>name: {item.merch.name}</div>
              <div>description: {item.merch.description}</div>
              <div>image: {item.merch.image}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
