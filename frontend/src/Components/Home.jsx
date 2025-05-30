import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      style={{
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        color: 'white',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
      }}
    >
      <Container fluid>
        <Row className="align-items-center">
          <Col md={6}>
            <h1>Welcome to ProdManage</h1>
            <p>
              Effortlessly manage your products with our all-in-one tool.
              Create, view, edit, and delete products — fast, simple, and reliable.
            </p>
            <Button as={Link} to="/products" variant="light">
              Explore Products
            </Button>
          </Col>
          <Col md={6} style={{ textAlign: 'center' }}>
            <img
              src="https://img.icons8.com/color/160/checked--v1.png"
              alt="Checklist"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
