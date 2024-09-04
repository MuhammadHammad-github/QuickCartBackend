require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./utils");
const app = express();
app.use(express.json());
app.use(cors());
connectToDb();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => {
  console.log("server started at port 3000");
});
