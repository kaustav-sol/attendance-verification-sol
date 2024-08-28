# Attendance Verification System
![Project Logo](logo.png)

## Vision

This Solidity contract provides a simple mechanism for tracking student attendance. Each student's attendance count and last attendance time are stored on the blockchain.

## Flowchart

```plaintext
+----------------------------------------+
| Start                                  |
+----------------------------------------+
              |
              v
+----------------------------------------+
| Student calls `markAttendance`         |
+----------------------------------------+
              |
              v
+----------------------------------------+
| Check if 24 hours have passed          |
| since the last attendance              |
+----------------------------------------+
        |               |
        v               v
+------------------+    +----------------------------------------+
| True             |    | False                                  |
|                  |    |                                        |
| Increment        |    | Revert transaction with an error       |
| attendance count |    | "You can only mark attendance once     |
| and update last  |    | every 24 hours"                        |
| attendance time  |    |                                        |
+------------------+    +----------------------------------------+
              |
              v
+----------------------------------------+
| Emit `AttendanceMarked` event          |
+----------------------------------------+
              |
              v
+----------------------------------------+
| End                                    |
+----------------------------------------+
```

## Contract

### Blockchain
**EDU-Chain**

### Contract Address
**0x6708394A11e44F9b51f3C2803dED1edFfF041554**

## Key Features

- **Marking Attendance:** Students can mark their attendance by calling the `markAttendance()` function. This function ensures that a student can only mark attendance once every 24 hours.
- **Attendance Count:** The `getAttendance()` function retrieves the total attendance count for a given student.
- **Last Attendance Time:** The `getLastAttendanceTime()` function returns the timestamp of the student's last attendance.

## Usage

1. **Mark Attendance:** Students can interact with the contract using a web3-enabled wallet or a dApp to call the `markAttendance()` function.
2. **Retrieve Attendance Data:** Use the `getAttendance()` and `getLastAttendanceTime()` functions to obtain a student's attendance count and last attendance time.

## Future Scope
- **Incentives and Rewards**: Implement a reward system where students with consistent attendance can earn tokens or other incentives.
- **Multi-User Role Support**: Introduce roles such as administrators or teachers who can view or modify attendance records under specific conditions.
- **Attendance History**: Implement functionality to track and retrieve the entire attendance history for each student.
- **Mobile Integration**: Develop a DApp for mobile devices to make the attendance marking process more user-friendly and accessible.

## Author Details
- **Name**: Kaustav Raj Kalita
- **Contact**: kaustav.adtu@gmail.com
- **Twutter**: kaustav_stwt
- **GitHub**: kaustav-sol

## License

This contract is licensed under the MIT License.
