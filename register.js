const db = require("../config/db-config");
const bcrypt = require("bcryptjs");
const { json } = require("express");

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone|| !password)
    return res.json({
      status: "error",
      error: "Please enter all the information",
    });
  else {
    db.query(
      "SELECT email FROM user WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) throw err;
        if (result[0])
          return (
            res,
            json({
              status: "error",
              error: "Email has already been registered",
            })
          );
        else {
          const pass = await bcrypt.hash(password, 8);
          db.query(
            "INSERT INTO user SET ?",
            {
              name: name,
              email: email,
              phone: phone,
              password: pass,
            },
            (error, results) => {
              if (error) throw error;
              res.status(200).redirect("/success");
            }
          );
        }
      }
    );
  }
};

module.exports = register;
