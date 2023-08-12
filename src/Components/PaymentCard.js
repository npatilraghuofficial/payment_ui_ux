import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useNavigate } from 'react-router-dom';

import './PaymentCard.css'; // Import the CSS file you created

const CardWithMaskedNumber = ({ id, number, name, expiry, cvc, zIndex, link }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    sessionStorage.setItem('selectedCardId', id);
    navigate(link);
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

const PaymentCard = () => {
  const [debitCards, setDebitCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(10);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/debitCards')
      .then(response => {
        setDebitCards(response.data.reverse());
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleScroll = () => {
    if (
      scrollRef.current &&
      window.innerHeight + window.scrollY >= scrollRef.current.offsetTop + scrollRef.current.clientHeight
    ) {
      setVisibleCards(prevVisibleCards => prevVisibleCards + 10);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function maskCardNumber(value) {
    const stringValue = value.toString();
    let maskedValue = '';

    for (let i = 0; i < stringValue.length; i++) {
      if (i >= 2 && i < stringValue.length - 4) {
        maskedValue += '*';
      } else {
        maskedValue += stringValue[i];
      }
    }

    return maskedValue;
  }

  return (
    <div className="App">
      <h1>React Credit Cards Analysis (LazyLoading)</h1>
      <div className="card-list" ref={scrollRef}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          debitCards.slice(0, visibleCards).map((card, index) => (
            <div
              key={index}
              className="card-item"
              style={{ zIndex: index + 1 }} // Increase the zIndex value
            >
              <CardWithMaskedNumber
                id={card.id}
                number={maskCardNumber(card.cardNumber)}
                name={card.cardholderName}
                expiry={card.expiryDate}
                cvc={card.cvv}
                zIndex={index + 1}
                link={`/CardDetails/${card.id}`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
