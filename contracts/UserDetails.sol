// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract UserDetails {
    struct User {
        string username;
        string name;
        string phoneNumber;
        string category;
        string skills;
        // string bioDescription;
        // uint256 hourlyRate;
        // string photo; // Consider storing photo as IPFS hash
        // string country;
        // string state;
        // string city;
        // string gender;
        // uint256 yearsOfExperience;
        // string dob;
        // string language;
        // string educationStatus;
    }

    mapping(address => User) public users;

    event UserDetailsAdded(address indexed userAddress);

    function addUserDetails(
        string memory _username,
        string memory _name,
        string memory _phoneNumber,
        string memory _category,
        string memory _skills
        // string memory _bioDescription,
        // uint256 _hourlyRate,
        // string memory _photo,
        // string memory _country,
        // string memory _state,
        // string memory _city,
        // string memory _gender,
        // uint256 _yearsOfExperience,
        // string memory _dob,
        // string memory _language,
        // string memory _educationStatus
    ) public {
        User storage user = users[msg.sender];
        require(bytes(user.username).length == 0, "User details already exist");

        user.username = _username;
        user.name = _name;
        user.phoneNumber = _phoneNumber;
        user.category = _category;
        user.skills = _skills;
        // user.bioDescription = _bioDescription;
        // user.hourlyRate = _hourlyRate;
        // user.photo = _photo;
        // user.country = _country;
        // user.state = _state;
        // user.city = _city;
        // user.gender = _gender;
        // user.yearsOfExperience = _yearsOfExperience;
        // user.dob = _dob;
        // user.language = _language;
        // user.educationStatus = _educationStatus;

        emit UserDetailsAdded(msg.sender);
    }
}
