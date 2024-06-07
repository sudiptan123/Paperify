const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const db = require("../config/db-config");

const isLoggedIn = async (req, res, next) => {
    if (req.cookies.userSaved) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.userSaved,
                process.env.JWT_SECRET
            );
            db.query(
                "SELECT * FROM user WHERE id = ?",
                [decoded.id],
                (err, results) => {
                    if (!results) {
                        return next();
                    }
                    req.user = results[0];
                    req.role = "USER";
                    return next();
                }
            );
        } catch (err) {
            console.log(err);
            return next();
        }
    } else if (req.cookies.adminSaved) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.adminSaved,
                process.env.JWT_SECRET1
            );
            db.query(
                "SELECT * FROM admin WHERE id = ?",
                [decoded.id],
                (err, results) => {
                    if (!results) {
                        return next();
                    }
                    req.admin = results[0];
                    req.role = "ADMIN";
                    return next();
                }
            );
        } catch (err) {
            console.log(err);
            return next();
        }
    }else {
        next();
    }
};

module.exports = isLoggedIn;
