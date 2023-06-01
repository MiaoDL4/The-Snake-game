import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token); // takes back to home page
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <Container style={{ height: "75dvh" }} className="d-flex flex-column">
            <Row className="h-100 py-5 ">
              <Col
                className="bg-info d-flex justify-content-center align-items-center mx-2 rounded-4"
                as={Link}
                to="/me"
              >
                <h1 className="">Proflie</h1>
              </Col>
              <Col
                className="bg-danger d-flex justify-content-center align-items-center mx-2 rounded-4"
                as={Link}
                to="/play"
              >
                <h1 className="">Play</h1>
              </Col>
              <Col
                className="bg-light d-flex justify-content-center align-items-center mx-2 rounded-4"
                as={Link}
                to="/shop"
              >
                <h1 className="">Shop</h1>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <>
          <h1>please log in...</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={formState.email}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formState.password}
                name="password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Button as={Link} variant="secondary" className="m-2" to="/signup">
            Signup
          </Button>

          {error && <Alert variant="danger">{error.message}</Alert>}
        </>
      )}
    </>
  );
};

export default Login;
