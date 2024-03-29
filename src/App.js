import React, { useState } from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardDetails from './Components/CardDetails';
import ListAllCards from './Components/ListAllCards';
import PaymentCard from './Components/PaymentCard';
import VisualGraph from './Components/Graphs/VisualGraph';

function App() {
  const [showCardDetails, setShowCardDetails] = useState(false);

  const handleViewDetails = () => {
    setShowCardDetails(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route index path="/" element={<PaymentCard />} />
          <Route path="/CardDetails/:id" element={<CardDetails />} /> {/* Pass ":id" as a parameter */}
          {/* <Route path="/" element={<ListAllCards />} /> */}
          <Route  path="/VisualGraph" element={<VisualGraph />} />

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
