import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-landing" role="main" aria-label="Dashboard">
      <div className="home-brand">
        <img
          className="home-logo"
          src="/images/Logo.png"
          alt="Edinova"
          decoding="async"
        />
        <h1 className="home-subtitle">Dashboard</h1>
      </div>
    </div>
  );
};

export default Home;
