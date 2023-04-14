import React, { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "@/contexts/CartContext";
import { useRouter } from "next/router";

const PaymentForm = (total) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setItems } = useContext(CartContext);
  const [token, setToken] = useState();
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    // Create a payment method with card details
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false);
    } else {
      var total = localStorage.getItem("total");
      var data = JSON.parse(localStorage.getItem("order"));
      // Send payment method details to the server for processing
      const { clientSecret } = await fetch("http://localhost:8080/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email, // Replace with your actual email
          amount: total, // Replace with your actual amount
          currency: "inr", // Replace with your actual currency
          payment_method: paymentMethod.id,
          description: "Home Decore Customer",
          name: data.name,
          address: data.address,
        }),
      }).then((res) => res.json());

      // Confirm the payment intent with the client secret
      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        setError(confirmError.message);
        setIsProcessing(false);
      } else {
        // Payment succeeded
        setError(null);
        setIsProcessing(false);
        alert("Payment succeeded!");
        setItems([]);
        localStorage.removeItem("order");
        localStorage.removeItem("total");
        router.push("/orders");
      }
    }
  };

  return (
    <div className=" h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className=" h-40 w-96 border p-4 shadow-md items-center"
      >
        {" "}
        <div className="mb-2  font-bold uppercase text-gray-900 sm:text-xl sm:tracking-tight lg:text-xl">
          Pay Using your Card
        </div>
        <CardElement />
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="mt-5 text-center text-md px-4 py-2 leading-none border rounded   text-[#362F2F] bg-orange-50 text-bold"
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
