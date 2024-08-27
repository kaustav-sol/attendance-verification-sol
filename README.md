## Attendance Verification Contract
![Project Logo](logo.png)

**Overview**

This Solidity contract provides a simple mechanism for tracking student attendance. Each student's attendance count and last attendance time are stored on the blockchain.

**Key Features**

- **Marking Attendance:** Students can mark their attendance by calling the `markAttendance()` function. This function ensures that a student can only mark attendance once every 24 hours.
- **Attendance Count:** The `getAttendance()` function retrieves the total attendance count for a given student.
- **Last Attendance Time:** The `getLastAttendanceTime()` function returns the timestamp of the student's last attendance.

**Deployment**

1. **Compile:** Use a Solidity compiler (e.g., Remix, Truffle, Hardhat) to compile the contract.
2. **Deploy:** Deploy the compiled contract to an Ethereum network (e.g., Ethereum mainnet, Goerli testnet).

**Usage**

1. **Mark Attendance:** Students can interact with the contract using a web3-enabled wallet or a dApp to call the `markAttendance()` function.
2. **Retrieve Attendance Data:** Use the `getAttendance()` and `getLastAttendanceTime()` functions to obtain a student's attendance count and last attendance time.

**License**

This contract is licensed under the MIT License.
