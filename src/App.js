import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Shop from './Shop';
import AddItem from './AddItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/AddItem" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
