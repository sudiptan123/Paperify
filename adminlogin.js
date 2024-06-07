const jwt = require("jsonwebtoken");
const db = require("../config/db-config");
// const bcrypt = require("bcryptjs");

const adminlogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.json({
            status: "error",
            error: "Please enter your email and password",
        });
    else {
        db.query(
            "SELECT * FROM admin WHERE email = ?",
            [email],
            async (Err, result) => {
                if (Err) throw Err;
                if (!result[0] || !(await (password === result[0].password)))
                    return res.json({
                        status: "error",
                        error: "Incorrect Email or Password",
                    });
                else {
                    const token = jwt.sign(
                        { id: result[0].id },
                        process.env.JWT_SECRET1,
                        {
                            expiresIn: process.env.JWT_EXPIRES1,
                        }
                    );
                    const cookieOptions = {
                        expiresIn: new Date(
                            Date.now() +
                                process.env.COOKIE_EXPIRES1 *
                                    24 *
                                    60 *
                                    60 *
                                    1000
                        ),
                        httpOnly: true,
                    };
                    res.cookie("adminSaved", token, cookieOptions);
                    res.status(200).redirect("/");
                }
            }
        );
    }
};

module.exports = adminlogin;
