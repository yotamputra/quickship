const { showLoginForm, processLogin, showDashboard, logout, addUser, createUser, getItems, getUsers, getDeliveries, getCouriers, addItem, createItem, addDelivery, createDelivery, editItem, updateItem, deleteItem } = require("../controllers");

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


router.get("/items", getItems);

router.get('/items/add', addItem)
router.post('/items/add', createItem)

router.get('/items/:id/edit', editItem)
router.post('/items/:id/edit', updateItem)

router.get("/items/:id/delete", deleteItem)


router.get("/deliveries", getDeliveries);

router.get('/deliveries/add', addDelivery)
router.post('/deliveries/add', createDelivery)

router.get("/couriers", getCouriers);

module.exports = router