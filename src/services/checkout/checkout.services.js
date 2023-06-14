import createStripe from "stripe-client";
import { host } from "../../utils/env";
const stripe = createStripe(
  "pk_test_51NH6qXCe68SDIUUs7lryrmeC0d3Ark9z8WWYU6jHQ0znQ6YP3KfTI8A2Pf4H4OZUuGOPERv5MfqWswK0JoybSqRT00ZcD28n8r"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = async (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};
