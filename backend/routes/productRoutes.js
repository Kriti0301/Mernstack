/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (paginated, searchable, sorted)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: keyword
 *         schema: { type: string }
 *       - in: query
 *         name: sort
 *         schema: { type: string }
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Product list fetched
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Product found
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               image: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *     security: [bearerAuth: []]
 *     responses:
 *       201:
 *         description: Product created
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               image: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Product updated
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Product deleted
 */


const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// GET all products
router.get("/",auth,  async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const keyword = req.query.keyword || "";
    const sort = req.query.sort || "createdAt"; // default to newest first

    const searchFilter = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const total = await Product.countDocuments(searchFilter);

    const products = await Product.find(searchFilter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      products,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single product by ID
router.get("/:id", auth ,async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

// CREATE product
router.post("/", auth, async (req, res) => {
  try {
    const { title, image, description, price } = req.body;
    const product = new Product({ title, image, description, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Failed to create product" });
  }
});

// UPDATE product
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update product" });
  }
});

// DELETE product
router.delete("/:id", auth,  async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
