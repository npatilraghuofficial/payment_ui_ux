import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-credit-cards";
import { formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData } from "./utils";
import "react-credit-cards/es/styles-compiled.css";

import "./CardDetails.css";

function CardDetails() {
  const { id } = useParams();
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    cardBgColor: "",
    averageTransactionAmount: 0.0,
    highestTransactionAmount: 0,
    lowestTransactionAmount: 0,
    monthlySpendingPattern: {},
    transactionLocations: [],
    transactionTimestamps: [],
    foreignTransactionCount: 0,
    isExpired: false,
    merchantCategories: [],
    transactionSuccessRate: 0.0,
    paymentMethod: "",
    availableCredit: 0,
    monthlyPaymentAmount: 0,
    paymentHistory: {},
  });

  useEffect(() => {
    fetch(`http://localhost:9000/debitCards/${id}`)
      .then(response => response.json())
      .then(data => {
        const fetchedCardDetails = {
          number: formatCreditCardNumber(data.cardNumber),
          name: data.cardholderName,
          expiry: data.expiryDate,
          cvc: data.cvv,
          issuer: data.issuer,
          cardBgColor: data.cardBgColor,
          averageTransactionAmount: data.averageTransactionAmount,
          highestTransactionAmount: data.highestTransactionAmount,
          lowestTransactionAmount: data.lowestTransactionAmount,
          monthlySpendingPattern: data.monthlySpendingPattern,
          transactionLocations: data.transactionLocations,
          transactionTimestamps: data.transactionTimestamps,
          foreignTransactionCount: data.foreignTransactionCount,
          isExpired: data.isExpired,
          merchantCategories: data.merchantCategories,
          transactionSuccessRate: data.transactionSuccessRate,
          paymentMethod: data.paymentMethod,
          availableCredit: data.availableCredit,
          monthlyPaymentAmount: data.monthlyPaymentAmount,
          paymentHistory: data.paymentHistory,
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
  }, [id]);

  const { name, number, expiry, cvc, issuer, cardBgColor, formData, ...otherAttributes } = cardDetails;

  return (
    <div key="Payment">
      <div className="App-payment">
        <h1> Cards Statistics</h1>
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={false}
        />
        <div className="App-form">
         
          <ul>
            <li>averageTransactionAmount :  {cardDetails.averageTransactionAmount}      </li>
          </ul>
          <li>Average Transaction Amount: {cardDetails.averageTransactionAmount}</li>
            <li>Highest Transaction Amount: {cardDetails.highestTransactionAmount}</li>
            <li>Lowest Transaction Amount: {cardDetails.lowestTransactionAmount}</li>
            <li>Foreign Transaction Count: {cardDetails.foreignTransactionCount}</li>
            <li>Is Expired: {cardDetails.isExpired ? "Yes" : "No"}</li>
            <li>Transaction Success Rate: {cardDetails.transactionSuccessRate}</li>
            <li>Payment Method: {cardDetails.paymentMethod}</li>
            <li>Available Credit: {cardDetails.availableCredit}</li>
            <li>Monthly Payment Amount: {cardDetails.monthlyPaymentAmount}</li>



            <h2>Merchant Categories:</h2>
          <ul>
            {cardDetails.merchantCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          <h2>Monthly Spending Pattern:</h2>
          <ul>
            {Object.entries(cardDetails.monthlySpendingPattern).map(([month, amount], index) => (
              <li key={index}>{month}: {amount}</li>
            ))}
          </ul>
          <h2>Transaction Locations:</h2>
          <ul>
            {cardDetails.transactionLocations.map((location, index) => (
              <li key={index}>Lat: {location.lat}, Lng: {location.lng}</li>
            ))}
          </ul>
          <h2>Merchant Categories:</h2>
          <ul>
            {cardDetails.merchantCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          <h2>Monthly Spending Pattern:</h2>
          <ul>
            {Object.entries(cardDetails.monthlySpendingPattern).map(([month, amount], index) => (
              <li key={index}>{month}: {amount}</li>
            ))}
          </ul>
          {/* <h2>Transaction Locations:</h2>
          <ul>
            {cardDetails.transactionLocations.map((location, index) => (
              <li key={index}>Lat: {location.lat}, Lng: {location.lng}</li>
            ))}
          </ul> */}


          </div>
        <hr style={{ margin: "60px 0 30px" }} />
        {/* Rest of the content */}
      </div>
      <div className="App-credits">{/* ... */}</div>
    </div>
  );
}

export default CardDetails;
