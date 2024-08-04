import Web3 from "web3";
import { abi, contractAddress } from "./contract.js";

let web3;
let contract;
let userAddress;

async function connectWallet() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            userAddress = accounts[0];
            contract = new web3.eth.Contract(abi, contractAddress);
            console.log("Wallet connected. User address:", userAddress);
            updateBalances();
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

async function updateBalances() {
    try {
        const investment = await contract.methods.withdrawable(userAddress).call();
        const earnings = await contract.methods.withdrawable(userAddress).call(); // Adjust if needed
        document.getElementById("investment").innerText = `${web3.utils.fromWei(investment, "ether")} BUSD`;
        document.getElementById("earnings").innerText = `${web3.utils.fromWei(earnings, "ether")} BUSD`;
    } catch (error) {
        console.error("Error fetching balances:", error);
        document.getElementById("investment").innerText = "Error";
        document.getElementById("earnings").innerText = "Error";
    }
}

document.getElementById("connectWalletButton").addEventListener("click", async () => {
    console.log("Connect Wallet button clicked");
    await connectWallet();
});

document.getElementById("farmButton").addEventListener("click", async () => {
    console.log("Farm button clicked");
    try {
        await contract.methods.farm().send({ from: userAddress });
        updateBalances();
    } catch (error) {
        console.error("Error farming:", error);
    }
});

document.getElementById("harvestButton").addEventListener("click", async () => {
    console.log("Harvest button clicked");
    try {
        await contract.methods.harvest().send({ from: userAddress });
        updateBalances();
    } catch (error) {
        console.error("Error harvesting:", error);
    }
});

document.getElementById("claimButton").addEventListener("click", async () => {
    console.log("Claim button clicked");
    try {
        await contract.methods.claim().send({ from: userAddress });
        updateBalances();
    } catch (error) {
        console.error("Error claiming:", error);
    }
});

window.addEventListener("load", connectWallet);
