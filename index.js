const express = require("express");
const db = require("./config/db-config");
const app = express();
const cookie = require("cookie-parser");
const port = process.env.PORT;

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/img", express.static(__dirname + "/public/assets/img"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.connect((err) => {
  if (err) throw err;
  console.log("database connected");
});

app.use("/", require("./routes/routes"));
app.use("/api", require("./controllers/auth"));

app.listen(port);
