const router = require("express").Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Cart = require("../models/Product");

//Create a Cart

router.post("/", verifyToken ,async (request, response) => {
  const newCart = new Cart(request.body);

  try {
    const savedCart = await newCart.save();
    response.status(200).json(savedCart);
  } catch (error) {
    response.status(500).json(error);
  }
});

//Update a cart
router.put("/:id", verifyTokenAndAuthorization, async (request, response) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );

    response.status(200).json(updatedCart);
  } catch (error) {
    response.status(500).json(error);
  }
});

//Delete a cart
router.delete("/:id", verifyTokenAndAuthorization, async (request, response) => {
  try {
    await Cart.findByIdAndDelete(request.params.id);
    response.status(200).json("Cart has been deleted...");
  } catch (error) {
    response.status(500).json(error);
  }
});

//Find user Cart
router.get("/find/:userId", verifyTokenAndAuthorization ,async (request, response) => {
  try {
    const cart = await Cart.findOne({ userId: request.params.userId});
    response.status(200).json(cart);
  } catch (error) {
    response.status(500).json(error);
  }
});

//Get all carts
router.get("/", verifyTokenAndAdmin, async (request, response) => {
    try {
      const carts = await Cart.find();
      response.status(200).json(carts);
    } catch (err) {
      response.status(500).json(err);
    }
  });






 module.exports = router;