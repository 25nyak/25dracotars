body {
    font-family: Arial, sans-serif;
    background-color: #000; /* Black background */
    color: #fff; /* White text */
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    background-color: #001f3f; /* Dark blue */
    padding: 20px;
    text-align: center;
}

.logo {
    width: 100px;
    height: auto;
}

main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.wallet {
    margin-bottom: 20px;
}

.info {
    margin-bottom: 20px;
}

.actions button, #connectWalletButton {
    background-color: #007bff; /* Blue button */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
}

.actions button:hover, #connectWalletButton:hover {
    background-color: #0056b3; /* Darker blue on hover */
}

footer {
    background-color: #001f3f; /* Dark blue */
    text-align: center;
    padding: 10px;
    position: relative;
    bottom: 0;
    width: 100%;
}
