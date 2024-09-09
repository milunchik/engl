const User = require("../models/user");

const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await User.create({ email: email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const correct = bcrypt.compare(newPassword, user.password);

    if (correct) {
      return res.status(200).json(user);
    }

    return res.status(400).json({ message: "Invalid password" });
  } catch (err) {
    console.log(err);
  }
};

const getSignUp = async (req, res) => {
  res.render("signup");
};
const getSignIn = async (req, res) => {
  res.render("signin");
};

module.exports = {
  signup,
  signin,
  getSignUp,
  getSignIn,
};
