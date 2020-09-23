const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");


const csrfProtection = csrf({cookie: true});

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

app.set("view engine", "pug");

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

const validateUser = (req, res, next) => {
  const { id, firstName, lastName, email, password, confirm_password } = req.body;
  const errors = [];
  if(!firstName) {
    errors.push("Please fill out the first name field")
  };
  if(!lastName) {
    errors.push("Please fill out the last name field")
  };
  if(!email) {
    errors.push("Please fill out the email field")
  };
  if(!password) {
    errors.push("Please fill out the password field")
  };
  if(password !== confirm_password) {
    errors.push("Passwords must match")
  }
  req.errors = errors;
  next();
}


app.get("/", (req, res) => {
  res.render("index", { users: users });
});

app.get("/create", csrfProtection, (req, res) => {
  res.render("create-normal", {csrfToken: req.csrfToken()})

})


app.get("/create-interesting", csrfProtection, (req, res) => {
  res.render("create-interesting", {csrfToken: req.csrfToken()})
})

app.post("/create", validateUser, (req, res) => {
  const { id, firstName, lastName, email } = req.body;
  if(req.errors.length > 0) {
    res.render("create-normal", {
      errors: req.errors,
      id,
      firstName,
      lastName,
      email
    })
    return;
  }
  const user = {
    id,
    firstName,
    lastName,
    email
  };
  users.push(user);
  res.redirect("/");
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
