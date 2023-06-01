import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import Auth from "../../utils/auth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar bg="primary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h2>The Snake Game</h2>
        </Navbar.Brand>

        <div>
          {Auth.loggedIn() && (
            <Container>
              {location.pathname !== "/" && (
                <Button
                  variant="dark"
                  className="m-2"
                  onClick={() => navigate(-1)}
                >
                  &larr; Go Back
                </Button>
              )}
              <Button variant="outline-danger" className="m-2" onClick={logout}>
                Logout
              </Button>
            </Container>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
