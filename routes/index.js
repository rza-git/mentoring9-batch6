// setup router
const express = require("express");

// Grouping endpoints
const router = express.Router();
const productRouter = require("./product.route.js")
const storeRouter = require("./store.route.js")

// Parameter 1 = prefix (opsional)
// Parameter 2 = router / middleware
router.use("/api/products", productRouter);
router.use("/api/stores", storeRouter)



module.exports = router;