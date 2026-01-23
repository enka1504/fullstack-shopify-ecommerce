const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
//Register

router.post("/register", async (request, response) => {
  console.log(request, "request");

  const newUser = new User({
    username: request.body.username,
    email: request.body.email,
    password: CryptoJs.AES.encrypt(
      request.body.password,
      process.env.PASSWORD_SECRET,
    ).toString(),
    gender: request.body.gender,
    img: request.body.img,
    fullName: request.body.fullName,
  });

  try {
    const savedUser = await newUser.save();
    response.status(200).json(savedUser);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ username: request.body.username });
    !user && response.status(400).json("Wrong credentials!");

    const hashPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET,
    );

    const OriginalPassword = hashPassword.toString(CryptoJs.enc.Utf8);

    console.log(OriginalPassword, "OriginalPassword", request.body.password);
    OriginalPassword !== request.body.password &&
      response.status("400").json("Wrong Password!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
    );

    const responseData = {
      id: user._id,
      username: user.username, // Example field
      email: user.email, // Example field
      isAdmin: user.isAdmin, // Example field
      createdAt: user.createdAt, // Example field
      updatedAt: user.updatedAt, // Example field
      accessToken, // Include the JWT token
    };

    // const { password, ...others } = user._doc;
    // response.status(200).json({ ...others, accessToken });
    response.status(200).json(responseData);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
