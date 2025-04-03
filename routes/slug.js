const express = require('express');
const router = express.Router();
const categoryModel = require('../schemas/category');
const productModel = require('../schemas/products');
const { CreateErrorRes, CreateSuccessRes } = require('../utils/responseHandler');

// Route bắt slug: /:categorySlug/:productSlug
router.get('/:categorySlug/:productSlug', async (req, res, next) => {
  try {
    const { categorySlug, productSlug } = req.params;

    const category = await categoryModel.findOne({ slug: categorySlug });
    if (!category) return CreateErrorRes(res, "Category not found", 404);

    const product = await productModel.findOne({
      slug: productSlug,
      category: category._id,
      isDeleted: false
    }).populate("category");

    if (!product) return CreateErrorRes(res, "Product not found", 404);

    return CreateSuccessRes(res, product, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
