const {
  User,
  Courier,
  Delivery,
  Item,
  Delivery_Courier,
} = require("../models");

exports.showLoginForm = async (req, res) => {
  try {
    res.render("login", { errorMessage: null });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.processLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.render("login", {
        errorMessage: "Email atau password salah!",
      });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("login", { errorMessage: "Terjadi kesalahan, coba lagi!" });
  }
};

exports.showDashboard = async (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { email: req.session.user.email });
  } else {
    res.redirect("/login");
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return "Terjadi kesalahan saat logout";
    }
    res.redirect("/login");
  });
};

exports.addUser = async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.createUser = async (req, res) => {
  // console.log(req.body)
  let { email, password, latitude, longitude } = req.body;
  try {
    await User.create({
      email,
      password,
      latitude: +latitude,
      longitude: +longitude,
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.send(deliveries);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.getCouriers = async (req, res) => {
  try {
    const couriers = await Courier.findAll();
    res.send(couriers);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.addItem = async (req, res) => {
  try {
    res.render("addItem");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.createItem = async (req, res) => {
  try {
    await Item.create(req.body);
    res.redirect("/items");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.addDelivery = async (req, res) => {
  try {
    const sender = req.session.user.email;
    const receivers = await User.findAll();
    const items = await Item.findAll();

    console.log(req.session);
    console.log(sender);

    res.render("addDelivery", {
      receivers,
      items,
      email: sender,
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.createDelivery = async (req, res) => {
  try {
    const { receiverId, itemId } = req.body;

    const senderId = req.session.user.id;

    // Membuat data pengiriman baru
    const newDelivery = await Delivery.create({
      SenderId: senderId,
      ReceiverId: receiverId,
      ItemId: itemId,
    });

    res.redirect("/deliveries");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.render('items', {items});
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.render('deliveries', {deliveries});
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.getCouriers = async (req, res) => {
  try {
    const couriers = await Courier.findAll();
    res.render('couriers', {couriers});
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
