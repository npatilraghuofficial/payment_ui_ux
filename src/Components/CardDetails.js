import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Card from "react-credit-cards";
import { formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData } from "./utils";
import "react-credit-cards/es/styles-compiled.css";

import "./CardDetails.css"; // Import the CSS file you created

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

function maskCardNumber(value) {
  const maskedValue = value.replace(/\d(?=\d{4})/g, "*");
  return maskedValue;
}

const CardDetails = () => {
  const { id } = useParams(); // Get the id from the URL

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
    fetch(`http://localhost:9000/debitCards/${id}`) // Use the id from useParams
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
  }, [id]); // Include id in the dependency array

  const handleInputChange = ({ target }) => {
    // ... (same as before)
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
