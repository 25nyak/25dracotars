// public/js/main.js
import Web3 from "web3";
import { abi } from "./contract.js";

const contractAddress = "0x0e7aa2284f327da941f25243c59362be80860492";
let web3;
let contract;
let userAddress;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAddress = accounts[0];
            contract = new web3.eth.Contract(abi, contractAddress);
            document.getElementById("connectButton").innerText = `Connected: ${userAddress}`;
            updateBalances();
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

async function updateBalances() {
    try {
        const investment = await contract.methods.withdrawable(userAddress).call();
        const earnings = await contract.methods.withdrawable(userAddress).call(); // Assuming earnings are the same method, adjust if needed
        document.getElementById("investment").innerText = `${web3.utils.fromWei(investment, "ether")} BUSD`;
        document.getElementById("earnings").innerText = `${web3.utils.fromWei(earnings, "ether")} BUSD`;
    } catch (error) {
        console.error("Error fetching balances", error);
    }
}

async function farm() {
    const amount = document.getElementById("amountInput").value;
    if (amount > 0) {
        const amountInWei = web3.utils.toWei(amount, "ether");
        try {
            await contract.methods.farm(amountInWei).send({ from: userAddress });
            updateBalances();
        } catch (error) {
            console.error("Error farming", error);
        }
    } else {
        alert("Please enter a valid amount to stake.");
    }
}

async function claim() {
    try {
        await contract.methods.claim().send({ from: userAddress });
        updateBalances();
    } catch (error) {
        console.error("Error claiming", error);
    }
}

async function harvest() {
    const amount = document.getElementById("harvestAmountInput").value;
    if (amount > 0) {
        const amountInWei = web3.utils.toWei(amount, "ether");
        try {
            await contract.methods.harvest(amountInWei).send({ from: userAddress });
            updateBalances();
        } catch (error) {
            console.error("Error harvesting", error);
        }
    } else {
        alert("Please enter a valid amount to harvest.");
    }
}

document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("farmButton").addEventListener("click", farm);
document.getElementById("claimButton").addEventListener("click", claim);
document.getElementById("harvestButton").addEventListener("click", harvest);
