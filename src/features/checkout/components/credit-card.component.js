import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import createStripe from "stripe-client";
const CreditCardInput = () => {
  const stripe = createStripe(
    "pk_test_51NH6qXCe68SDIUUs7lryrmeC0d3Ark9z8WWYU6jHQ0znQ6YP3KfTI8A2Pf4H4OZUuGOPERv5MfqWswK0JoybSqRT00ZcD28n8r"
  );

  const onChange = async (formData) => {
    const { values, status } = formData;
    const inIncomplete = Object.values(status).includes("incomplete");
    const card = {
      number: "424242424",
      exp_month: "02",
      exp_year: "29",
      cvc: "244",
      name: "Giorgi",
    };
    const info = await stripe.createToken({ card });
    console.log("info", info);
  };
  return <LiteCreditCardInput onChange={onChange}></LiteCreditCardInput>;
};

export default CreditCardInput;
