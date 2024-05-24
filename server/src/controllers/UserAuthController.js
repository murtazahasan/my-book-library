const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    return res.status(201).send({ user });
  } catch (error) {
    return res.status(500).send({ message: "Error signing up!", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordMatched) {
      return res.status(400).send({ message: "Wrong password" });
    }
    const jwtToken = jwt.sign(
      { _id: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(200).send({ existingUser, jwtToken });
  } catch (error) {
    return res.status(500).send({ message: "Error logging in!", error });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ message: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).send({ message: "Error logging out!", error });
  }
};

exports.myDetails = async (req, res) => {
  const userId = req._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "Cannot find user" });
    }
    return res.status(200).send({ user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error getting my details!", error });
  }
};
