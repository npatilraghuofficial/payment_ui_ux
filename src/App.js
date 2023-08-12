import React, { useState } from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardDetails from './Components/CardDetails';
import ListAllCards from './Components/ListAllCards';

function App() {
  const [showCardDetails, setShowCardDetails] = useState(false);

  const handleViewDetails = () => {
    setShowCardDetails(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/CardDetails" element={<CardDetails />} />
          <Route
            path="/"
            element={
              <ListAllCards
                showCardDetails={showCardDetails}
                onViewDetails={handleViewDetails}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
