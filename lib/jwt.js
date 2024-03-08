const jwt = require("jsonwebtoken");
const SECRET_KEY = "rahasiabanget"

// Generate JWT Token
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY)
}

// Verify token
const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    generateToken,
    verifyToken
}

