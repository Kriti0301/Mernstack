    import React from 'react';
import { Container, Card } from 'react-bootstrap';

function Contact() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <Card style={{ width: '25rem', padding: '2rem' }}>
        <h4>Contact Us</h4>
        <p><strong>Address:</strong> 123 React Street, UI City, CA 90210</p>
        <p><strong>Email:</strong> hello@prodmanage.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
      </Card>
    </Container>
  );
}

export default Contact;
