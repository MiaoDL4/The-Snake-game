import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Auth from "../../utils/auth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h2 style={{ color: "cyan" }}>The Snake Game</h2>
        </Navbar.Brand>

        <div>
        {location.pathname !== "/" && (
                <Button
                  variant="outline-primary"
                  className="m-2"
                  onClick={() => navigate(-1)}
                >
                  &larr; Go Back
                </Button>
              )}
          {Auth.loggedIn() && (
              <Button variant="outline-danger" className="m-2" onClick={logout}>
                Logout
              </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
