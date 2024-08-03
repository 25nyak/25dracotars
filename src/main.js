import web3 from './web3.js';
import contract from './contract.js';

document.addEventListener('DOMContentLoaded', async () => {
    const connectButton = document.getElementById('connectButton');
    const farmButton = document.getElementById('farmButton');
    const claimButton = document.getElementById('claimButton');
    const harvestButton = document.getElementById('harvestButton');

    connectButton.addEventListener('click', connectWallet);

    farmButton.addEventListener('click', async () => {
        const amount = document.getElementById('amountInput').value;
        console.log(`Farming ${amount} BUSD`);
        await farm(amount);
        await updateIndicators();
    });

    claimButton.addEventListener('click', async () => {
        console.log('Claiming rewards');
        await claim();
        await updateIndicators();
    });

    harvestButton.addEventListener('click', async () => {
        const amount = document.getElementById('harvestAmountInput').value;
        console.log(`Harvesting ${amount} BUSD`);
        await harvest(amount);
        await updateIndicators();
    });

    if (await isWalletConnected()) {
        connectButton.innerText = 'Wallet Connected';
        await updateIndicators();
    }
});

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log(`Connected account: ${account}`);
            document.getElementById('connectButton').innerText = 'Wallet Connected';
            await updateIndicators();
        } catch (error) {
            console.error('User rejected the request.');
        }
    } else {
        alert('Please install MetaMask!');
    }
}

async function isWalletConnected() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        return accounts.length > 0;
    }
    return false;
}

async function farm(amount) {
    const accounts = await web3.eth.getAccounts();
    const weiAmount = web3.utils.toWei(amount, 'ether');
    await contract.methods.farm(weiAmount).send({ from: accounts[0] });
}

async function claim() {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.claim().send({ from: accounts[0] });
}

async function harvest(amount) {
    const accounts = await web3.eth.getAccounts();
    const weiAmount = web3.utils.toWei(amount, 'ether');
    await contract.methods.harvest(weiAmount).send({ from: accounts[0] });
}

async function updateIndicators() {
    const accounts = await web3.eth.getAccounts();
    const user = accounts[0];

    const investment = await contract.methods.withdrawable(user).call();
    const earnings = await contract.methods.stakeFee(user).call();

    document.getElementById('investment').innerText = web3.utils.fromWei(investment, 'ether') + ' BUSD';
    document.getElementById('earnings').innerText = web3.utils.fromWei(earnings, 'ether') + ' BUSD';
}
