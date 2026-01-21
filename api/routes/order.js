const router = require("express").Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Order = require("../models/Order");

//Create an Order
router.post("/", verifyToken, async (request, response) => {
  const newOrder = new Order(request.body);

  try {
    const savedOrder = await newOrder.save();
    response.status(200).json(savedOrder);
  } catch (error) {
    response.status(500).json(error);
  }
});

//Update an Order
router.put("/:id", verifyTokenAndAdmin, async (request, response) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );

    response.status(200).json(updatedOrder);
  } catch (error) {
    response.status(500).json(error);
  }
});

//Delete an order
router.delete("/:id", verifyTokenAndAdmin, async (request, response) => {
  try {
    await Order.findByIdAndDelete(request.params.id);
    response.status(200).json("Order has been deleted...");
  } catch (error) {
    response.status(500).json(error);
  }
});

//Get User Order
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  async (request, response) => {
    try {
      const orders = await Order.find({ userId: request.params.userId });
      response.status(200).json(orders);
    } catch (error) {
      response.status(500).json(error);
    }
  }
);

//Get all orders
router.get("/", verifyTokenAndAdmin, async (request, response) => {
  try {
    const orders = await Order.find();
    response.status(200).json(orders);
  } catch (err) {
    response.status(500).json(err);
  }
});

//Get all Income
router.get("/income", verifyTokenAndAdmin, async (request, response) => {
  const productId = request.query.productId;
  const date = new Date(); //Nov
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); //Oct
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId: productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    response.status(200).json(income);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
