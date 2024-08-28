import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import ConnectWallet from './ConnectWallet';

const contractAddress = "0x95964D1878d645C3c7a319b8b3e21E8C27468779"; // Replace with your deployed contract address
const contractABI = [
  {
    "inputs": [],
    "name": "markAttendance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_student", "type": "address" }],
    "name": "getAttendance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_student", "type": "address" }],
    "name": "getLastAttendanceTime",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [lastAttendanceTime, setLastAttendanceTime] = useState(0);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const setupContract = async () => {
      if (walletAddress) {
        const ethProvider = new ethers.BrowserProvider(window.ethereum);
        const signerInstance = await ethProvider.getSigner();
        setSigner(signerInstance);

        const contractInstance = new ethers.Contract(contractAddress, contractABI, signerInstance);
        setContract(contractInstance);
      }
    };
    setupContract();
  }, [walletAddress]);

  const handleWalletConnection = (address) => {
    setWalletAddress(address);
  };

  const handleMarkAttendance = async () => {
    try {
      if (contract && signer) {
        const tx = await contract.markAttendance();
        await tx.wait();  // Wait for transaction confirmation
        alert("Attendance marked successfully!");
      } else {
        alert("Contract or signer not initialized.");
      }
    } catch (error) {
      if (error.message.includes("You can only mark attendance once every 24 hours")) {
        alert("You can only mark attendance once every 24 hours. Please try again later.");
      } else {
        console.error("Error marking attendance:", error);
        alert("Failed marking attendance. Please check the console for more details.");
      }
    }
  };

  const handleGetAttendance = async () => {
    try {
      const count = await contract.getAttendance(walletAddress);

      // Check if the returned value is a BigNumber
      if (count && count._isBigNumber) {
        setAttendanceCount(count.toNumber());
      } else {
        // Handle other possible return types
        setAttendanceCount(Number(count));
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };


  const handleGetLastAttendanceTime = async () => {
    try {
      const time = await contract.getLastAttendanceTime(walletAddress);
      const timestamp = time._isBigNumber ? time.toNumber() : Number(time);
      setLastAttendanceTime(new Date(timestamp * 1000));  // Convert UNIX timestamp to Date
    } catch (error) {
      console.error("Error fetching last attendance time:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Attendance System</h1>

        {/* Connect Wallet Component */}
        <ConnectWallet onConnect={handleWalletConnection} />

        {walletAddress && (
          <div className="content">


            <div className="button-group">
              <button className="button" onClick={handleMarkAttendance}>Mark Attendance</button>
              <button className="button" onClick={handleGetAttendance}>Get Attendance Count</button>
              <button className="button" onClick={handleGetLastAttendanceTime}>Get Last Attendance Time</button>
            </div>

            <div className="info">
              <p>Attendance Count: {attendanceCount}</p>
              <p>Last Attendance Time: {new Date(lastAttendanceTime).toLocaleString()}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
