const express = require('express');
const router = express.Router();
const categoryModel = require('../schemas/category');
const productModel = require('../schemas/products');
const { CreateErrorRes, CreateSuccessRes } = require('../utils/responseHandler');

// Route: /:categorySlug hoặc /:categorySlug/:productSlug
router.get('/:categorySlug/:productSlug?', async (req, res, next) => {
  try {
    const { categorySlug, productSlug } = req.params;

    const category = await categoryModel.findOne({ slug: categorySlug });
    if (!category) return CreateErrorRes(res, "Category not found", 404);

    // Nếu có productSlug → trả về chi tiết sản phẩm
    if (productSlug) {
      const product = await productModel.findOne({
        slug: productSlug,
        category: category._id,
        isDeleted: false
      }).populate("category");

      if (!product) return CreateErrorRes(res, "Product not found", 404);
      return CreateSuccessRes(res, product, 200);
    }

    // Không có productSlug → trả về danh sách sản phẩm trong category
    const products = await productModel.find({
      category: category._id,
      isDeleted: false
    }).populate("category");

    return CreateSuccessRes(res, products, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
