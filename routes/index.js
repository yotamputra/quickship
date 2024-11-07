const { showLoginForm, processLogin, showDashboard, logout, addUser, createUser } = require("../controllers");

const router = require("express").Router();


router.get("/", (req, res) => {
  res.redirect('./login')
});
router.get("/login", showLoginForm);
router.post("/login", processLogin);
router.get("/dashboard", showDashboard);
router.get("/logout", logout);
router.get("/register", addUser);
router.post("/register", createUser);




router.get("/items", (req, res) => {
  res.send("Menampilkan data items");
});

router.get("/users", (req, res) => {
  res.send("Menampilkan data users");
});

router.get("/deliveries", (req, res) => {
  res.send("Menampilkan status pengiriman");
});

router.get("/couriers", (req, res) => {
  res.send("Menampilkan data kurir");
});

module.exports = router