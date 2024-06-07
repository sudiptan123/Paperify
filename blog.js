const jwt = require("jsonwebtoken");
const db = require("../config/db-config");
const bcrypt = require("bcryptjs");

module.exports.getBlog = async (req, res, next) => {
    db.query(
        "SELECT b.id as bId, b.title as bTitle, b.content as bContent, , b.title as bTitle FROM blog b where b.id = ?",
        [req.params.bId],
        (Err, result) => {
            if (Err) throw Err;
            if (!result[0]) {
                req.blog = "";
                return next();
            } else {
                req.blog = result[0];
                return next();
            }
        }
    );
};
