// src/components/Info.js
import React from 'react';

const Info = ({ investment, earnings }) => {
  return (
    <section className="info">
      <p>Your Investment: <span>{investment} BUSD</span></p>
      <p>Your Earnings: <span>{earnings} BUSD</span></p>
    </section>
  );
};

export default Info;
