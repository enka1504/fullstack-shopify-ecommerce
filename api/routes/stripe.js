const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment", (request, response) => {
  stripe.charges.create(
    {
      source: request.body.tokenId,
      amount: request.body.amount,
      currency: "usd",
    }, 
    (stripeError, stripeRespse) => {
      if (stripeError) {
        response.status(500).json(stripeError);
      } else {
        response.status(200).json(stripeRespse);
      }
    }
  );
});

module.exports = router;
