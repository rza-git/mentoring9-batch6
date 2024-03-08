const express = require('express')
const app = express()
const port = 3000
const router = require("./routes")
const errorHandler = require("./middlewares/errorHandler.js")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const morgan = require("morgan")

app.use(morgan("combined"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// PARSING JSON TO OBJECT
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})