// src/App.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { contractAddress, abi } from './contract';
import Header from './components/Header';
import Info from './components/Info';
import Actions from './components/Actions';
import './styles.css';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [investment, setInvestment] = useState('Loading...');
  const [earnings, setEarnings] = useState('Loading...');

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.requestAccounts();
        setAccount(accounts[0]);

        const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
        setContract(contractInstance);

        const userInvestment = await contractInstance.methods.withdrawable(accounts[0]).call();
        setInvestment(web3Instance.utils.fromWei(userInvestment, 'ether'));

        const userEarnings = await contractInstance.methods.withdrawable(accounts[0]).call(); // Adjust if needed
        setEarnings(web3Instance.utils.fromWei(userEarnings, 'ether'));
      } else {
        alert('Please install MetaMask');
      }
    };

    connectWallet();
  }, []);

  const handleFarm = async () => {
    if (contract && account) {
      try {
        await contract.methods.farm().send({ from: account });
        updateBalances();
      } catch (error) {
        console.error('Error farming:', error);
      }
    }
  };

  const handleHarvest = async () => {
    if (contract && account) {
      try {
        await contract.methods.harvest().send({ from: account });
        updateBalances();
      } catch (error) {
        console.error('Error harvesting:', error);
      }
    }
  };

  const handleClaim = async () => {
    if (contract && account) {
      try {
        await contract.methods.claim().send({ from: account });
        updateBalances();
      } catch (error) {
        console.error('Error claiming:', error);
      }
    }
  };

  const updateBalances = async () => {
    const userInvestment = await contract.methods.withdrawable(account).call();
    setInvestment(web3.utils.fromWei(userInvestment, 'ether'));

    const userEarnings = await contract.methods.withdrawable(account).call(); // Adjust if needed
    setEarnings(web3.utils.fromWei(userEarnings, 'ether'));
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Info investment={investment} earnings={earnings} />
        <Actions onFarm={handleFarm} onHarvest={handleHarvest} onClaim={handleClaim} />
      </main>
    </div>
  );
}

export default App;
