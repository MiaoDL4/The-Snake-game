import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const [showAlert, setShowAlert] = useState(false);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/store" />;
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

  if (!user) {
    return <h4>loading...</h4>;
  }
  const handleButton = async (e) => {
    const ID = e.target.value;
    const selected = user.inventory.find(
      (seletedTheme) => seletedTheme.merch._id === ID
    );
    localStorage.setItem("themeSnake", JSON.stringify(selected));
    setShowAlert(true);
  };
  const alertButton = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col>
            <Row className="pb-3">
              <Card className="bg-dark border-primary rounded-4 p-0">
                <Card.Header>
                  <h3>Username</h3>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-center">
                    <h1>{user.username}</h1>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Row>
            <Row className="pb-3">
              <Card
                md={6}
                sm={12}
                className="bg-dark border-primary rounded-4 p-0"
              >
                <Card.Header>
                  <h3>Top games</h3>
                </Card.Header>
                <Col className="p-2">
                  {user.games.slice(0,5).map((game) => (
                    <Row className="m-0 text-center">
                      <Col className="bg-dark">
                        <h4>apples eaten: {game.score}</h4>
                      </Col>
                      <Col className="bg-dark">
                        <h4>Time: {game.time}</h4>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Card>
            </Row>
            <Row className="pb-3">
              <Card className="bg-dark border-primary rounded-4 p-0 ">
                <Card.Header>
                  <h3> Apples</h3>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-center">
                    <h2>{user.currency}</h2>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col>
            <Card className="bg-dark border-primary rounded-4 ">
              <Card.Header>
                <h3 className="text-start">Themes</h3>
              </Card.Header>
              <Card.Body>
                <Row className="text-center ">
                  {/* make in to comp */}
                  {user.inventory.map((item) => (
                    <Row md={4} sm={12} className="{id} w-100 py-1 m-0">
                      <Card className="py-1 px-2 rounded-3 w-100">
                        <dt>
                          <h5>{item.merch.name}</h5>
                        </dt>
                        <Row className="pb-1">
                          <Col>
                            <div
                              className="rounded-3"
                              style={{
                                color: item.merch.modifierSnake,
                              }}
                            >
                              <h5>
                                <strong>Snake</strong>
                              </h5>
                            </div>
                          </Col>
                          <Col>
                            <div
                              className="rounded-3"
                              style={{
                                color: item.merch.modifierBoard,
                              }}
                            >
                              <h5>
                                <strong>Board</strong>
                              </h5>
                            </div>
                          </Col>
                          <Col>
                            <div
                              className="rounded-3"
                              style={{
                                color: item.merch.modifierFood,
                              }}
                            >
                              <h5>
                                <strong>Apples</strong>
                              </h5>
                            </div>
                          </Col>
                        </Row>
                        <Row className="d-flex flex-row-reverse">
                          <Col className="pb-3">
                            <Button
                              key={item._id}
                              className=" w-25 btn-sm px-2"
                              variant="outline-secondary"
                              value={item.merch._id}
                              onClick={handleButton}
                            >
                              Select Theme
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Row>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Alert
        show={showAlert}
        variant="success"
        className="text-center position-absolute top-50 start-50 translate-middle"
      >
        <h4>
          Theme Changed{" "}
          <Button className="btn-sm" variant="success" onClick={alertButton}>
            X
          </Button>
        </h4>
      </Alert>
    </>
  );
};

export default Profile;
