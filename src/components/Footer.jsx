import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer py-5">
      <Container>
        <Row className="text-center">
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p className="text-muted">&copy; 2024 Ryan Yee. All rights reserved.</p>
            <p className="text-muted">Built with React, JavaScript, PostgreSQL, Node.js</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
