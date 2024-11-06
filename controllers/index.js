const { User, Courier, Delivery, Item, Delivery_Courier } = require("../models");

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
      return res.render("login", { errorMessage: "Email atau password salah!" });
    }

    req.session.user = {
      id: user.id,
      email: user.email
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("login", { errorMessage: "Terjadi kesalahan, coba lagi!" });
  }
};

exports.showDashboard = (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { email: req.session.user.email });
  } else {
    res.redirect("/login");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Terjadi kesalahan saat logout");
    }
    res.redirect("/login");
  });
};