const bcrypt = require("bcrypt");
const User = require("../model/users");
const jwt = require("jsonwebtoken");

module.exports.registerUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User created successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: "User already exists!" });
    }
    res.status(500).json({ err: error.message });
  }
};

module.exports.loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ err: "User not found!" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      res.status(404).json({ err: "Email or password is incorrect!" });
    }

    const payload = { id: user.id, name: user.username };

    const JWT_SECRETE = process.env.JWT_SECRET_KEY;

    const ACCESS_TOKEN = jwt.sign(payload, JWT_SECRETE, { expiresIn: "1h" });

    res.cookie("access_token", ACCESS_TOKEN, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successfully!", ACCESS_TOKEN });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
