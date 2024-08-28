import React, { useState } from 'react';
import { ethers } from 'ethers';
import './ConnectWallet.css'; // Add styling for ConnectWallet

function ConnectWallet({ onConnect }) {
    const [walletAddress, setWalletAddress] = useState('');

    const handleConnect = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const address = accounts[0];
                setWalletAddress(address);
                onConnect(address);
            } catch (error) {
                console.error("Error connecting wallet:", error);
                alert("Failed to connect wallet. Please check the console for more details.");
            }
        } else {
            alert("MetaMask is not installed. Please install MetaMask and try again.");
        }
    };

    return (
        <div className="connect-wallet">
            {walletAddress ? (
                <div className="connected">
                    <p>Wallet Connected:</p>
                    <p className="address">{walletAddress}</p>
                </div>
            ) : (
                <button className="connect-button" onClick={handleConnect}>
                    Connect Wallet
                </button>
            )}
        </div>
    );
}

export default ConnectWallet;
