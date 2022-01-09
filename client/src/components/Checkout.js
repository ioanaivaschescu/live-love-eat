import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";

export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const dispatch = useDispatch();

  function tokenHander(token) {
    dispatch(placeOrder(token, subtotal));
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong..." />}
      {success && <Success success="Your order placed successfully!" />}

      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        token={tokenHander}
        stripeKey="pk_test_51K6eZDAkwlpIO2wLDRi3Oxxe9bbdi8qdudqW5sEmKNBqJbuaOLGWgNyQqjieDRkZNQXMCy9rbEtiJHSFxy3DxXvE00tZqywFDK"
        currency="USD"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
