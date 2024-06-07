const jwt = require("jsonwebtoken");
const db = require("../config/db-config");
const bcrypt = require("bcryptjs");

module.exports.getBloglist = async (req, res, next) => {
    
    

    
    db.query(
        "SELECT u.id as uId, u.name as uName, u.phone as uPhone, u.email as uEmail, b.id as bId, b.title as bTitle, b.content as bContent, b.link as bLink FROM blog b JOIN user u ON b.userId = u.id",
        (Err, result) => {
            if (Err) throw Err;
            if (!result[0]) {
                req.bloglist = "";
                return next();
            } else {
                req.bloglist = result;
                return next();
            }
        }
    );
};




module.exports.createBlog = async (req, res, next) => {
    if (req.role === "ADMIN" || req.role === "USER") {
        userId  =  req.role == "USER" ? Number(req.user.id) : Number(req.body.userId)
        blogTitle = req.body.blogTitle;
        blogContent = req.body.blogContent; 
        blogLink = req.body.blogLink;
        blogCatagory = req.body.blogCatagory;//blogCatagory
        pic = req.body.pic;
        db.query(
            "INSERT INTO blog SET ?",
            {
                userId: userId,
                title: blogTitle,
                catagory: blogCatagory,
                content: blogContent,
                link: blogLink,
            },
            (error, results) => {
                if (error) throw error;
                return next();
            }
        );
    }
};


module.exports.deleteBlog = async (req, res, next) => {
    if (req.role === "ADMIN" || req.role === "USER") {
        blogId = Number(req.params.bId);
        userId = Number(req.params.uId);
        db.query(
            `DELETE FROM blog WHERE id = ? and userId = ?`,
            [blogId, userId],
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
