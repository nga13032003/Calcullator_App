import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Calculator from './components/Calculator';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div style={{ marginLeft: 256, padding: '16px' }}>
          <Routes>
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/" element={<h1>Home Page</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 