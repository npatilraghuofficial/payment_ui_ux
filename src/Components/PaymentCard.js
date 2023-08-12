// PaymentCard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useNavigate } from 'react-router-dom';

import './PaymentCard.css'; // Import the CSS file you created

const CardWithMaskedNumber = ({ number, name, expiry, cvc, zIndex, link }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(link); // Navigate to the specified link when the card is clicked
  };

  return (
    <a href={link} className="card-link" onClick={handleCardClick}>
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
    </a>
  );
};

export default function App() {
  const [debitCards, setDebitCards] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:9000/debitCards')
      .then(response => {
        const updatedCards = response.data.reverse().map(card => ({
          ...card,
          isHovered: false,
        }));
        setDebitCards(updatedCards);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCardHover = index => {
    const updatedCards = debitCards.map((card, i) => ({
      ...card,
      isHovered: i === index,
    }));
    setDebitCards(updatedCards);
  };

  return (
    <div className="App">
      <h1>React Credit Cards</h1>
      <div className="card-list">
        {debitCards.map((card, index) => (
          <div
            key={index}
            className={`card-item ${card.isHovered ? 'hovered' : ''}`}
            style={{ zIndex: index + 1 }} // Increase the zIndex value
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={() => handleCardHover(-1)}
          >
            <CardWithMaskedNumber
              number={card.cardNumber}
              name={card.cardholderName}
              expiry={card.expiryDate}
              cvc={card.cvv}
              zIndex={index + 1}
              link={`/CardDetails/${card.id}`} // Replace with the appropriate link
            />
          </div>
        ))}
      </div>
    </div>
  );
}
