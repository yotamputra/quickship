const { showLoginForm, processLogin, showDashboard, logout, getUsers, getDeliveries, getCouriers } = require("../controllers");

const router = require("express").Router();


router.get("/login", showLoginForm);
router.post("/login", processLogin);
router.get("/dashboard", showDashboard);
router.get("/logout", logout);



router.get("/", (req, res) => {
  res.redirect('./login')
});

router.get("/items", getItems);

router.get("/users", getUsers);

router.get("/deliveries", getDeliveries);

router.get("/couriers", getCouriers);

module.exports = router