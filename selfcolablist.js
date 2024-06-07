const jwt = require("jsonwebtoken");
const db = require("../config/db-config");
const bcrypt = require("bcryptjs");

module.exports.getselfcolablist = async (req, res, next) => {

    db.query(
        "SELECT u.id as uId, u.name as uName, b.id as bId, b.title as bTitle, b.content as bContent, b.catagory as bCatagory, b.useremail as bEmail FROM colab b JOIN user u ON b.userId = u.id",
        (Err, result) => {
            if (Err) throw Err;
            if (!result[0]) {
                req.colablist = "";
                return next();
            } else {
                req.colablist = result;
                return next();
            }
        }
    );
};




// module.exports.createColab = async (req, res, next) => {
//     if (req.role === "ADMIN" || req.role === "USER") {
//         userId  =  req.role == "USER" ? Number(req.user.id) : Number(req.body.userId)
//         colabTitle = req.body.colabTitle;
//         colabContent = req.body.colabContent; 
//         colabEmail = req.body.colabEmail;
//         colabCatagory = req.body.colabCatagory;//colabCatagory
//         db.query(
//             "INSERT INTO colab SET ?",
//             {
//                 userId: userId,
//                 title: colabTitle,
//                 catagory: colabCatagory,
//                 content: colabContent,
//                 useremail: colabEmail,
//             },
//             (error, results) => {
//                 if (error) throw error;
//                 return next();
//             }
//         );
//     }
// };


module.exports.deleteselfColab = async (req, res, next) => {
    if (req.role === "ADMIN" || req.role === "USER") {
        colabId = Number(req.params.bId);
        userId = Number(req.params.uId);
        db.query(
            `DELETE FROM colab WHERE id = ? and userId = ?`,
            [colabId, userId],
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
