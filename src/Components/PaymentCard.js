import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useNavigate } from 'react-router-dom';

import './PaymentCard.css'; // Import the CSS file you created

const CardWithMaskedNumber = ({ id,number, name, expiry, cvc, zIndex, link }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    
    const selectedCardId = sessionStorage.setItem('selectedCardId', id);
    // alert(selectedCardId);git 
    navigate(link); // Navigate to the specified link when the card is clicked
  };

  return (
    <form className="card-link" onClick={handleCardClick}>
      <Card
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={false}
        containerClassName="card-container"
        numberClassName="card-number"
        style={{ zIndex }}
      >
        <div className="card-number-mask">
          {'*'.repeat(12)}
        </div>
      </Card>
    </form>
  );
};

export default function App() {
  const [debitCards, setDebitCards] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:9000/debitCards')
      .then(response => {
        setDebitCards(response.data.reverse());
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>React Credit Cards</h1>
      <div className="card-list">
        {debitCards.map((card, index) => (
          <div
            key={index}
            className="card-item"
            style={{ zIndex: index + 1 }} // Increase the zIndex value
          >
            <CardWithMaskedNumber
              number={card.cardNumber}
              name={card.cardholderName}
              expiry={card.expiryDate}
              cvc={card.cvv}
              zIndex={index + 1}
              link={`/CardDetails/${card.id}`}
            //   onClick ={sessionStorage.setItem('selectedCardId', card.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
