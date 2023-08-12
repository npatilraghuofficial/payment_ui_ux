import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import paymentCard from 'react-payment-card-component';

const ListAllCards = () => {
  const [debitCards, setDebitCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/debitCards')
      .then(response => {
        setDebitCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCardClick = (cardId) => {
    // Set the clicked card's ID in session storage
    sessionStorage.setItem('selectedCardId', cardId);
    alert("session id set");

    // Navigate to the CardDetails page
    navigate('/CardDetails');
  };

  return (
    <Container>
      <h1>List of Debit Cards</h1>
      <Grid container spacing={3}>
        {debitCards.map(card => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card onClick={() => handleCardClick(card.id)} sx={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6">{card.cardholderName}</Typography>
                <Typography variant="body2" className="card-number">
                  Card Number: {card.cardNumber}
                </Typography>
                <Typography variant="body2" className="expiry-date">
                  Expiry Date: {card.expiryDate}
                </Typography>
                <Typography variant="body2" className="cvv">
                  CVV: {card.cvv}
                </Typography>
              </CardContent>
              <Button onClick={() => handleCardClick(card.id)}>Details</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListAllCards;
