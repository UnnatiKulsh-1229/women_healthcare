const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                // Encrypt password
                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                    [name, email, hashedPassword],
                    (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            success: true,
                            message: "Registration Successful"
                        });

                    }
                );

            }
        );

    } catch (error) {
        res.status(500).json(error);
    }
};
//login
const loginUser = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(400).json({
                    message: "Incorrect Password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                success: true,
                message: "Login Successful",
                token
            });

        }
    );
};

module.exports = {
    registerUser,
    loginUser
};