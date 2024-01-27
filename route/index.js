const express = require("express");
const productController = require("../controller/product");
const userController = require("../controller/user");
const cartController = require("../controller/cart");
const { verifyToken } = require("../middleware/user");
const historyController = require("../controller/historyCart");

const router = express.Router();

// products
router.get("/api/product", productController.getProducts);
router.get("/api/product/:id", productController.getProductById);
// router.post("/api/product",verifyToken ,productController.postProduct);
// router.patch("/api/product/:id",verifyToken ,productController.editProduct);
// router.delete("/api/product/:id",verifyToken ,productController.deleteProduct);

// user
router.post("/api/login", userController.Login);
router.get("/api/logout", verifyToken, userController.Logout);
router.post("/api/register", verifyToken, userController.registerUser);

// cart
router.post("/api/add-to-cart", verifyToken, cartController.addToCart);
router.get("/api/get-cart", verifyToken, cartController.getCart);
router.patch(
  "/api/update-quantity",
  verifyToken,
  cartController.updateQuantity
);
router.delete("/api/delete-cart", verifyToken, cartController.deleteCart);

// history
router.get("/api/history", historyController.getHistory);
router.delete("/api/history/:id", historyController.deleteHistory);
router.post("/api/complete/:id", historyController.completeCart);

module.exports = router;
