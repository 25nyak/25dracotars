// src/components/Actions.js
import React from 'react';

const Actions = ({ onFarm, onHarvest, onClaim }) => {
  return (
    <section className="actions">
      <button onClick={onFarm}>Farm</button>
      <button onClick={onHarvest}>Harvest</button>
      <button onClick={onClaim}>Claim</button>
    </section>
  );
};

export default Actions;
