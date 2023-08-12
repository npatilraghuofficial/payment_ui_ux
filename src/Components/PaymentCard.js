import React from "react";
import { PaymentCard } from "react-payment-cards";

export default function App() {
  const cardDetails = {
    cardHolderName: "Raghav P",
    cardValidity: "02/12",
    cardSecurityCode: "776",
    cardNumber: "******************4901"
  };
  return (
    <div className="App">
      <h1>React Payment Cards</h1>
      <div style={{ margin: "50px" }}>
        <PaymentCard
          cardDetails={cardDetails}
          flipped={false}
          cardBgColor="blood"
        />
      </div>
    </div>
  );
}
