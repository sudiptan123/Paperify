const jwt = require("jsonwebtoken");
const db = require("../config/db-config");
const bcrypt = require("bcryptjs");

module.exports.getUserlist = async (req, res, next) => {
    db.query(
        "SELECT u.id as uId, u.name as uName, u.phone as uPhone, u.email as uEmail FROM user u",
        (Err, result) => {
            if (Err) throw Err;
            if (!result[0])
                return res.json({
                    status: "error",
                    error: "No user found",
                });
            else {
                req.userlist = result;
                return next();
            }
        }
    );
};

module.exports.deleteUser = async (req, res, next) => {
    if (req.role === "ADMIN") {
        userId = Number(req.params.uId);
        db.query(
            `DELETE FROM user WHERE id = ?`,
            [userId],
            async (Err, result) => {
                if (Err) throw Err;
                if (!result[0]) {
                    return next();
                } else {
                    return next();
                }
            }
        );
    }
};
