import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import createStripe from "stripe-client";
const CreditCardInput = ({ name, onSuccess }) => {
  const stripe = createStripe(
    "pk_test_51NH6qXCe68SDIUUs7lryrmeC0d3Ark9z8WWYU6jHQ0znQ6YP3KfTI8A2Pf4H4OZUuGOPERv5MfqWswK0JoybSqRT00ZcD28n8r"
  );
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    const expiry = values.expiry.split("/");
    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name: name,
    };
    if (!isIncomplete) {
      const info = await stripe.createToken({ card });
      onSuccess(info);
    }
  };

  return <LiteCreditCardInput onChange={onChange}></LiteCreditCardInput>;
};

export default CreditCardInput;
