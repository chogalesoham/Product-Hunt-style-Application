import express from 'express';
import {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from '../Controllers/products-controllers.js';
import { CloudinaryFileUploder } from '../Middlewares/file-uploder.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/create', CloudinaryFileUploder.single('logoUrl'), createNewProduct);
router.put('/update/:id', CloudinaryFileUploder.single('logoUrl'), updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;
