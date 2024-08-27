// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleAttendance {
    // Store attendance count and last attendance time for each student address
    struct Student {
        uint256 attendanceCount;
        uint256 lastAttendanceTime;
    }

    mapping(address => Student) public students;

    // Event emitted when attendance is marked
    event AttendanceMarked(address indexed student, uint256 attendanceCount);

    // Mark attendance for the caller (student) only if 24 hours have passed
    function markAttendance() public {
        require(
            block.timestamp >= students[msg.sender].lastAttendanceTime + 1 days,
            "You can only mark attendance once every 24 hours"
        );

        // Increment attendance count
        students[msg.sender].attendanceCount += 1;
        // Update the last attendance time to the current timestamp
        students[msg.sender].lastAttendanceTime = block.timestamp;

        emit AttendanceMarked(msg.sender, students[msg.sender].attendanceCount);
    }

    // Get the attendance count for a specific student
    function getAttendance(address _student) public view returns (uint256) {
        return students[_student].attendanceCount;
    }

    // Get the last attendance time for a specific student
    function getLastAttendanceTime(address _student) public view returns (uint256) {
        return students[_student].lastAttendanceTime;
    }
}
