const express = require("express");
const router = express.Router();
const pool = require("../config/config.js")

// REST API
// GET ==> MENAMPILKAN DATA
// POST ==> CREATE DATA
// PUT ==> UPDATE DATA YANG ADA
// DELETE ==> DELETE DATA


// QUERY PARAMS ? => dipake untuk filter
// PATH VARIABLES => search berdasarkan id

// GET
// ADDRESS ==> /api/products
router.get("/", (req, res) => {
    // Akses data product dari database
    // parameter 1 => sql syntax
    // parameter 2 => ALIAS (optional)
    // parameter 3 => callback error sama data
    // const {store_id} = req.query;

    const filterStr = filterOption(req.query)
   
    const sql = `
        SELECT
            products.*,
            JSONB_AGG(JSONB_BUILD_OBJECT(
                'store', stores.title,
                'address', stores.address,
                'quantity', product_stores.quantity
            )) AS stores
        FROM
            products
        INNER JOIN product_stores
            ON products.id = product_stores.product_id
        INNER JOIN stores
            ON stores.id = product_stores.store_id
        ${filterStr}
        GROUP BY products.id
    `

    pool.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        } else {

            res.status(200).json(result.rows);
        }
    })
})

// GET PRODUCT DETAIL
router.get("/:id", (req, res) => {

    const {id} = req.params;

    const sql = `
        SELECT
            products.*,
            JSONB_AGG(JSONB_BUILD_OBJECT(
                'store', stores.title,
                'address', stores.address,
                'quantity', product_stores.quantity
            )) AS stores
        FROM
            products
        INNER JOIN product_stores
            ON products.id = product_stores.product_id
        INNER JOIN stores
            ON stores.id = product_stores.store_id
        WHERE
            products.id = $1
        GROUP BY products.id
    `

    // SERANGAN HACKER => TEKNIK SQL INJECTION
    // ALIAS => $

    pool.query(sql, [id], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        } else {

            if(result.rows.length === 0 ) {
                // DATA NOT FOUND
                res.status(404).json({message: "Product Not Found"})
            } else {
                res.status(200).json(result.rows[0]);
            }
        }
    })
})

// params req.query
const filterOption = (params) => {

    // if()
    // const {store_id} = params;

    // Pengecekan object kosong
    if(Object.entries(params).length === 0) {
        return ""
    } else {
        
        const {store_id} = params;

        let queryString = "WHERE "
        
        if(store_id) {
            queryString += `stores.id = ${store_id}`
        }

        return queryString;
    }

}

module.exports = router;