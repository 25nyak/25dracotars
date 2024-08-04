// src/components/Header.js
import React from 'react';
import logo from '../media/dragon-wbg.0b5d735dfc99821c8be4.png';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Dragon Logo" className="logo" />
      <h1>DragonBUSDStaking DApp</h1>
    </header>
  );
};

export default Header;
