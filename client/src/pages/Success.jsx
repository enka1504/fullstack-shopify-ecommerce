import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const stripePaymentData = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.productQuantity,
          })),
          amount: cart.total,
          address: stripePaymentData.billing_details.address,
        });
        //console.log(response);
        setOrderId(response.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    stripePaymentData && createOrder();
  }, [stripePaymentData, cart, currentUser]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been placed successfully. Your order number is ${orderId}`
        : `Successful. Your order is being prepared...`}
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20, cursor: "pointer"}}>Go to Homepage</button>
      </Link>
    </div>
  );
};
export default Success;
