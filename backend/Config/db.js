const mongoose = require("mongoose");
const Mongo_Url = process.env.MONGO_URL;

console.log(Mongo_Url);

mongoose
  .connect(Mongo_Url)
  .then(() => {
    console.log("MongoDB Connected succefull");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error", error);
  });
