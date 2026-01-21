const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

const router = require("express").Router();

router.put("/:id", verifyTokenAndAuthorization, async (request, response) => {
  //Before Updating, the user might want to change their password!
  if (request.body.password) {
    try {
      request.body.password = await CryptoJS.AES.encrypt(
        request.body.password,
        process.env.PASSWORD_SECRET,
      ).toString();
    } catch (error) {
      return response.status(500).json(error);
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true },
    );

    const { password, ...others } = updatedUser._doc;
    response.status(200).json(others);
  } catch (error) {
    response.status(500).json(error);
  }
});

//Delete a user
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  async (request, response) => {
    try {
      await User.findByIdAndDelete(request.params.id);
      response.status(200).json("User has been deleted...");
    } catch (error) {
      response.status(500).json(error);
    }
  },
);

//Find a user
router.get("/find/:id", verifyTokenAndAdmin, async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    const { password, ...others } = user._doc;
    response.status(200).json(others);
  } catch (error) {
    response.status(500).json(error);
  }
});

//Get all users
router.get("/", verifyTokenAndAdmin, async (request, response) => {
  const query = request.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json(error);
  }
});

//Get  user stats
router.get("/stats", verifyTokenAndAdmin, async (request, response) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
});

module.exports = router;
