const pool = require("../config/config.js")
const {hashPassword, comparePassword} = require("../lib/bcrypt.js")
const {generateToken} = require("../lib/jwt.js")

class AuthController {


    static register = async (req, res, next) => {
        // role => "admin" || "user"
        try {
            const {email, password, role} = req.body;   

            const hashPass = hashPassword(password);
    
            const insertSQL = `
                INSERT INTO users(email, password, role)
                    VALUES
                        ($1, $2, $3)
                RETURNING *
            `
    
            const result = await pool.query(insertSQL, [email, hashPass, role])
    
            res.status(201).json(result.rows[0])
        } catch(err) {
            next(err)
        }
    }

    static login = async (req, res, next) => {
        try {
            const {email, password} = req.body;

            // SEARCH USER by email

            // IF EXISTS compare password (bcrypt)
            // ELSE Invalid Credentials

            const searchSQL = `
                SELECT
                    *
                FROM
                    users
                WHERE email = $1
            `

            const result = await pool.query(searchSQL, [email])

            if(result.rows.length !== 0) {

                // compare password

                const foundUser = result.rows[0]

                if(comparePassword(password, foundUser.password)) {
                    
                    // generateToken

                    const accessToken = generateToken({
                        id: foundUser.id,
                        email: foundUser.email,
                        role: foundUser.role
                    })

                    res.status(200).json({
                        message: "Login successfull",
                        accessToken
                    })
                } else {
                    throw {name: "InvalidCredentials"}
                }
            } else {
                throw {name: "InvalidCredentials"}
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AuthController;