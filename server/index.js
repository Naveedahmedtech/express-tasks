require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const apiRoutes = require("./routes/api");


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongo"))
  .catch((error) => console.error(error));


const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);


app.use('/api', apiRoutes);


app.listen(PORT, (req, res) => {
    console.log(`App listening on port ${PORT}`);
})
