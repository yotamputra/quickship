const {
  User,
  Courier,
  Delivery,
  Item,
  Delivery_Courier,
} = require("../models");
const bcrypt = require('bcrypt');

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
    const totalItems = await Item.getTotalItem()
    const {totalCourier} = await Courier.totalCourier()

    res.render("dashboard", { email: req.session.user.email , totalItems, totalCourier});
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
    let { errors } = req.query;
    if (errors) errors = errors.split(",");

    res.render("signup", {errors});
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.createUser = async (req, res) => {
  let { email, password, latitude, longitude } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.create({
      email,
      password: hashedPassword,
      latitude: +latitude,
      longitude: +longitude,
    });
    
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    const messages = error.errors.map((el) => el.message).join(",")
    res.redirect(`/register?errors=${messages}`)
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
    let { errors } = req.query;
    if (errors) errors = errors.split(",");

    res.render("addItem", {errors});
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
    const messages = error.errors.map((el) => el.message).join(",")
    res.redirect(`/items/add?errors=${messages}`)
  }
};

exports.addDelivery = async (req, res) => {
  try {
    const sender = req.session.user.email;
    const receivers = await User.findAll();
    const items = await Item.findAll();


    // console.log(req.session);
    // console.log(sender);

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
    res.send(error)
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
    const deliveries = await Delivery.findAll({
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['email'],
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['email'],
        },
        {
          model: Item,
          attributes: ['name'],
        }
      ]
    });

    res.render('deliveries', { deliveries });
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

exports.editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    let { errors } = req.query;
    if (errors) errors = errors.split(",");

    res.render('editItem', { item, errors });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.updateItem = async (req, res) => {
  try {
    const {id} = req.params
    const data = req.body;

    const updatedItem = await Item.update(data, {
      where: {
        id: id,
      },
    });

    res.redirect(`/items`);
  } catch (error) {
    console.log(error);
    const { id } = req.params;
    const messages = error.errors.map((el) => el.message).join(",")
    res.redirect(`/items/${req.params.id}/edit?errors=${messages}`);
  }
};