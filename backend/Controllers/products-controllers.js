import productModel from '../Models/product-modle.js';

// Create a new product
const createNewProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      logoUrl: req.file ? req.file.path : null,
    };

    const newProduct = new productModel(productData);
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      success: true,
      message: 'Fetched all products successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get product by id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    res.status(200).json({
      success: true,
      message: 'Fetched product by id successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.logoUrl = req.file.path;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
