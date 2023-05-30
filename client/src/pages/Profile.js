import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
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
    <Card style={{ width: "20rem" }}>
      <Card.Header>User Details</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Username: {user.username}</ListGroup.Item>
        <ListGroup.Item>wins: {user.wins}</ListGroup.Item>
        <ListGroup.Item>losses: {user.losses}</ListGroup.Item>
        <ListGroup.Item>currency: {user.currecy}</ListGroup.Item>
        {user.inventory.map((item) => (
          <ListGroup.Item>
            <div>purchase date: {item.purchaseDate}</div>
            <div>name: {item.merch.name}</div>
            <div>description: {item.merch.description}</div>
            <div>image: {item.merch.image}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default Profile;
