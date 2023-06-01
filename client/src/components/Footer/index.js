import React from 'react';


import Container from 'react-bootstrap/Container';

const Footer = () => {

  return (
    <footer className="w-100 mt-auto bg-primary p-2 position-absolute bottom-0">
      <Container className="container text-center mb-2">
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>
        </h4>
      </Container>
    </footer>
  );
};

export default Footer;
