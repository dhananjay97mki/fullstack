import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<h1>Welcome! Edit App.js to get started.</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
