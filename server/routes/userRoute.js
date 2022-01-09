const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  let errors = {};

  if (password !== confirmPassword) errors.password = "Passwords must match !";

  if (!validateEmail(email)) errors.email = "This is not a valid email !";

  if (name.trim() === "") errors.name = "Username must not be empty !";
  if (email.trim() === "") errors.email = "Email must not be empty !";
  if (password.trim() === "") errors.password = "Password must not be empty !";
  if (confirmPassword.trim() === "")
    errors.confirmPassword = "Confirm password must not be empty !";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  const newUser = new User({ name, email, password });

  try {
    newUser.save();
    res.send("User registered successfully !");
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });

    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.send(currentUser);
    } else {
      return res.status(400).json({ message: "User login failed!" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.send("User deleted successfully!");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
