require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 8080;
const todoRoutes = require("./routes/todosRoutes");
const authRoutes = require("./routes/authRoutes");

//
app.use(cors());
app.use(express.json());
app.use(todoRoutes);
app.use(authRoutes);

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (!err) {
    // console.log("connected");
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build/"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
