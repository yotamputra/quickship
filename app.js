const express = require("express");
const session = require("express-session")
const app = express();
const port = 3000;

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
 