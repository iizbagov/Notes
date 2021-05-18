const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;
const todoRoutes = require("./routes/todosRoutes");
require("dotenv/config");

app.use(cors());
app.use(express.json());
app.use(todoRoutes);

mongoose.connect(process.env.DB_CONNECTION, (err) => {
  if (!err) {
    // console.log("connected");
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
