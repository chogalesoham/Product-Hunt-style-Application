const express = require("express");
const {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../Controllers/products-controllers");
const { CloudinaryFileUploder } = require("../Middlewares/file-uploder");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post(
  "/create",
  CloudinaryFileUploder.single("logoUrl"),
  createNewProduct
);
router.put(
  "/update/:id",
  CloudinaryFileUploder.single("logoUrl"),
  updateProduct
);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
