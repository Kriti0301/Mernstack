const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://csci5709tutorials.netlify.app"
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());


const authRoutes = require("./routes/userRoutes");
app.use("/api/auth", authRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);



app.get("/", (req, res) => {
  res.send("Backend API is working!");
});




  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
