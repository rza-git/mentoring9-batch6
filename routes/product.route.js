const express = require("express");
const router = express.Router();
const pool = require("../config/config.js")
const ProductController = require("../controllers/product.controller.js")
const {authorization} = require("../middlewares/auth.js")

// REST API
// GET ==> MENAMPILKAN DATA
// POST ==> CREATE DATA
// PUT ==> UPDATE DATA YANG ADA
// DELETE ==> DELETE DATA


// QUERY PARAMS ? => dipake untuk filter
// PATH VARIABLES => search berdasarkan id

// GET
// ADDRESS ==> /api/products

router.get("/", ProductController.findAll);
router.get("/:id", ProductController.findOne);

// Accessible only by admin
router.post("/", authorization, ProductController.create);
router.put("/:id", authorization, ProductController.update);
router.delete("/:id", authorization, ProductController.destroy);



module.exports = router;