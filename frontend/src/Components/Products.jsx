// src/components/Products.jsx
import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../redux/actions/productActions";
import ProductModalForm from "./ProductModalForm";

function Products() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productState);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentProduct({
      title: "",
      image: "",
      description: "",
      price: "",
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleFormSubmit = (values) => {
    if (isEdit) {
      dispatch(updateProduct(currentProduct.id, values));
    } else {
      dispatch(createProduct(values));
    }
  };

  return (
    <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Products</h2>
          <Button variant="primary" onClick={handleAdd}>Add Product</Button>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row>
            {(Array.isArray(products) ? products : []).map((prod) => (
              <Col md={4} key={prod.id} className="mb-4">
                <Card>
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                    <img
                      src={prod.image}
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
                    <Card.Text>{prod.description}</Card.Text>
                    <h5 style={{ color: "#007bff" }}>${prod.price}</h5>
                    <div className="d-flex justify-content-end gap-2">
                      <BsPencil
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEdit(prod)}
                      />
                      <BsTrash
                        style={{ cursor: 'pointer', color: 'red' }}
                        onClick={() => handleDelete(prod.id)}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Modal Form */}
        <ProductModalForm
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleFormSubmit}
          initialValues={currentProduct}
          isEdit={isEdit}
        />
      </Container>
    </div>
  );
}

export default Products;
