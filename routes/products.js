const productsController = require("../controllers/products");

const express = require("express");
const Router = express.Router();

Router.use("/add-product", productsController.addProductsPage);
Router.use("/product-submit", productsController.productAddedConfirmation);
Router.use("/shop", productsController.shopPage);
Router.use("/get-products", productsController.getProducts);
Router.use("/details/:id", productsController.detailsPage);
Router.use("/edit/:id", productsController.editPage);
Router.use(`/get-product/:id`, productsController.getProduct);
Router.use("/complete-edit", productsController.updateProducts);
Router.use("/delete/:id", productsController.deleteProduct);
Router.use(`/learn-more/:id`, productsController.learnMore);
Router.use(`/get/learn-more/:id`, productsController.getProduct)
Router.use(`/purchase`, productsController.shopPage);
Router.use(`/setCSRFToken`, productsController.setCSRFToken);

exports.Router = Router;

// This works as well
// module.exports = Router;
