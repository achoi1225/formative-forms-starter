const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");


const csrfProtection = csrf({cookie: true});

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;




app.set("view engine", "pug");


app.get("/", (req, res) => {
  res.render("index", { users: users });
});

app.get("/create", csrfProtection, (req, res) => {
  res.render("create-normal", {csrfToken: req.csrfToken()})

})


app.get("/create-interesting", csrfProtection, (req, res) => {
  res.render("create-interesting", {csrfToken: req.csrfToken()})
})

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
