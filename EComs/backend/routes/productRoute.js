const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductDetails,
  getAdminProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
} = require("../controllers/productController");

//const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/product/:id").get(getProductDetails);
router.route("/products").get(getAllProducts);

router.route("/admin/products").get(getAdminProducts);

router.route("/admin/product/new").post(createProduct);

router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);



router.route("/review").put(createProductReview);

router.route("/reviews").get(getProductReviews).delete(deleteReview);

module.exports = router;
