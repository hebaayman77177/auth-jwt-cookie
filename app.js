const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

// middleware
const corsOptions = {
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = "mongodb://127.0.0.1:27017";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// routes
app.use(checkUser);
app.use(authRoutes);

app.get("/test", requireAuth, (req, res) => {
  res.status(200).json({ message: "authed and reached" });
});
