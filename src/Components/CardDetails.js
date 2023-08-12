import React, { useState, useEffect } from "react";
import Card from "react-credit-cards";
import { formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData } from "./utils";
import "react-credit-cards/es/styles-compiled.css";

import Payment from "payment"; // Import the Payment library
import "./CardDetails.css"; // Import the CSS file you created

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

function maskCardNumber(value) {
  const maskedValue = value.replace(/\d(?=\d{4})/g, "*");
  return maskedValue;
}

const CardDetails = () => {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  useEffect(() => {
    const selectedCardId = sessionStorage.getItem("selectedCardId");
    if (selectedCardId) {
      fetch(`http://localhost:9000/debitCards/${selectedCardId}`)
        .then(response => response.json())
        .then(data => {
          const fetchedCardDetails = {
            number: formatCreditCardNumber(data.cardNumber),
            name: data.cardholderName,
            expiry: data.expiryDate,
            cvc: data.cvv,
            // Add other properties
          };
          setCardDetails({
            ...fetchedCardDetails,
            focused: "",
            formData: null,
          });
        })
        .catch(error => {
          console.error("Error fetching card details:", error);
        });
    }
  }, []);

  const handleInputChange = ({ target }) => {
    let newValue = target.value;

    if (target.name === "number") {
      newValue = clearNumber(newValue); // Remove non-digit characters
      newValue = maskCardNumber(newValue); // Apply the mask
    } else if (target.name === "expiry") {
      newValue = formatExpirationDate(newValue);
    } else if (target.name === "cvc") {
      newValue = formatCVC(newValue, cardDetails.cvc, cardDetails);
    }

    setCardDetails(prevDetails => ({ ...prevDetails, [target.name]: newValue }));
  };

  const { name, number, expiry, cvc, focused, issuer, formData } = cardDetails;

  return (
    <div key="Payment">
      <div className="App-payment">
        <h1> Cards Statistics</h1>
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
        />
        {formData && (
          <div className="App-highlight">
            {formatFormData(formData).map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>
        )}
        <hr style={{ margin: "60px 0 30px" }} />
        {/* Rest of the content */}
      </div>
      <div className="App-credits">
        {/* ... */}
      </div>
    </div>
  );
};

export default CardDetails;
