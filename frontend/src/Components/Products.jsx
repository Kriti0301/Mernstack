import React, { useEffect, useState } from 'react';
import {
  Container, Card, Button, Row, Col, Spinner, Form, InputGroup
} from 'react-bootstrap';
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts, createProduct, updateProduct, deleteProduct,
} from "../redux/actions/productActions";
import ProductModalForm from "./ProductModalForm";

function Products() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productState);
  //console.log("Redux products state:", products);
  // Extract nested list safely
  const productList = Array.isArray(products?.products) ? products.products : [];

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    title: "", image: "", description: "", price: "",
  });

  // 🔄 State for query params
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [page, setPage] = useState(1);
  const limit = 6; // products per page

  // 🔁 Fetch products based on current query
  useEffect(() => {
    dispatch(fetchProducts({ page, limit, keyword, sort }));
  }, [dispatch, page, keyword, sort]);

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentProduct({ title: "", image: "", description: "", price: "" });
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
      dispatch(updateProduct(currentProduct._id, values));
    } else {
      dispatch(createProduct(values));
    }
  };

  return (
    <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Products</h2>
          <Button variant="primary" onClick={handleAdd}>Add Product</Button>
        </div>

        {/* 🔎 Search and Sort */}
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button onClick={() => setPage(1)}>Search</Button>
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="createdAt">Newest</option>
              <option value="-createdAt">Oldest</option>
              <option value="price">Price (Low to High)</option>
              <option value="-price">Price (High to Low)</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Product Cards */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row>
            {productList.map((prod) => (
              <Col md={4} key={prod._id} className="mb-4">
                <Card>
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                    <img
                      src={prod.image}
                      alt={prod.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{prod.title}</Card.Title>
                    <Card.Text>{prod.description}</Card.Text>
                    <h5 style={{ color: "#007bff" }}>${prod.price}</h5>
                    <div className="d-flex justify-content-end gap-2">
                      <BsPencil style={{ cursor: 'pointer' }} onClick={() => handleEdit(prod)} />
                      <BsTrash style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(prod._id)} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Pagination Controls */}
        {products?.totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="me-2"
            >
              Prev
            </Button>
            <span className="px-3">Page {page} of {products.totalPages}</span>
            <Button
              variant="secondary"
              disabled={page === products.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
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
