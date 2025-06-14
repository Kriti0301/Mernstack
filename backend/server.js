const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const app = express();
app.use(cors({
  origin: "https://prodmanager-backend.onrender.com"
}));
app.use(express.json());


const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes); 

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);



app.get("/", (req, res) => {
  res.send("Backend API is working!");
});



mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
