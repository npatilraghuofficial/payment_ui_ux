import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from 'react-credit-cards';
import { useNavigate } from 'react-router-dom';

import 'react-credit-cards/es/styles-compiled.css';
import './PaymentCard.css'; // Import the CSS file you created
import CardDetails from './CardDetails';

const CardWithMaskedNumber = ({ id, number, name, expiry, cvc, zIndex, handleCardClick }) => (
  <div className="card-link" onClick={() => handleCardClick(id)}>
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
  </div>
);

const PaymentCard = () => {
  const [debitCards, setDebitCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(10);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const modalRef = useRef(null); // Add a ref for the modal

  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay

 
  useEffect(() => {
    
      axios.get('https://credit-card-gvu3.onrender.com/debitCards')
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

  const openDialog = (id) => {
    alert(id);
    const currentId = sessionStorage.setItem('currentId', id);
    setSelectedCardId(id);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    

  };

  const closeDialog = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Allow background scrolling
  
    setTimeout(() => {
      setShowOverlay(false); // Hide the overlay after the modal has started closing
    }, 300); // Adjust this time to match your transition duration
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const closeDialogOnMouseLeave = (event) => {
    // Close the modal when the cursor leaves the modal content
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeDialog();
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
    <div className="App"  >
      <h1>React Credit Cards Analysis (LazyLoading)</h1>
      <div className="card-list"  ref={scrollRef}>
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
                handleCardClick={openDialog}
                
              />
            </div>
          ))
        )}
      </div>
      {showModal && (
       <>
         <>
    <div className={`overlay ${showOverlay ? 'show' : ''}`} />
    <div className={`custom-modal ${showModal ? 'show' : ''}`} onMouseLeave={closeDialog} ref={modalRef}>
      <div className="modal-content">
        <CardDetails id={selectedCardId} />
        <button className="close-button" onClick={closeDialog}>
          Close
        </button>
      </div>
    </div>
  </>
          </>
      )}
    </div>
  );
};

export default PaymentCard;
