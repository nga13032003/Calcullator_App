
import React from 'react';
import './assets/styles/home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Calculator App!</h1>
      <p className="home-description">
        This application allows you to perform various calculations with ease.
      </p>
      <p className="home-instructions">
        Use the sidebar to navigate between different features.
      </p>
    </div>
  );
};

export default Home;
