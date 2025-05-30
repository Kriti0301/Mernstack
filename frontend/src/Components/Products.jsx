import React, { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { BsPencil, BsTrash } from "react-icons/bs";
import headphonesImg from '../assets/Headphone.jpg';
import Smartwatchimg from '../assets/Smartwatch.jpg';
import Laptopimg from '../assets/Laptop.jpg';

const mockProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    desc: "Noise cancelling over-ear headphones",
    price: "$120",
    img: headphonesImg
  },
  {
    id: 2,
    title: "Smart Watch",
    desc: "Smart wearable with health tracking",
    price: "$80",
    img: Smartwatchimg
  },
  {
    id: 3,
    title: "Laptop",
    desc: "14-inch Full HD display, 256GB SSD",
    price: "$600",
    img: Laptopimg
  }
];

function Products() {
  const [products] = useState(mockProducts);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
        <Button variant="primary">Add Product</Button>
      </div>
      <Row>
        {products.map(prod => (
          <Col md={4} key={prod.id} className="mb-4">
            <Card>
              <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                <img
                  src={prod.img}
                  alt={prod.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <Card.Body>
                <Card.Title>{prod.title}</Card.Title>
                <Card.Text>{prod.desc}</Card.Text>
                <h5 style={{ color: "#007bff" }}>{prod.price}</h5>
                <div className="d-flex justify-content-end gap-2">
                  <BsPencil style={{ cursor: 'pointer' }} />
                  <BsTrash style={{ cursor: 'pointer', color: 'red' }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
