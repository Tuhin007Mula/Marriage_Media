import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/transport" element={<TransportPage />} /> */}
        </Routes>
      </BrowserRouter>    
  );
};

export default App;