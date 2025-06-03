const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const userRoutes = require("./Routes/user-routes");
const productRouters = require("./Routes/products-routes");
const commentRouters = require("./Routes/comments-routes");

require("./Config/db");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/products", productRouters);
app.use("/api/comment", commentRouters);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
