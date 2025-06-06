// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();

// In-memory product data (initially empty)
let products = [];

// GET all products
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// GET product by ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
});

// CREATE product
router.post("/", (req, res) => {
  const { title, image, description, price } = req.body;
  if (!title || !image || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    title,
    image,
    description,
    price: parseFloat(price),
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// UPDATE product
router.put("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const { title, image, description, price } = req.body;
  product.title = title;
  product.image = image;
  product.description = description;
  product.price = parseFloat(price);
  res.status(200).json(product);
});

// DELETE product
router.delete("/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(index, 1);
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = router;
