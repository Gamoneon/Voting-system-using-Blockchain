// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Election {
    address public admin;
    uint256 candidateCount;
    uint256 voterCount;
    bool start;
    bool end;

    constructor() public {
        // Initilizing default values
        admin = msg.sender;
        candidateCount = 0;
        voterCount = 0;
        start = false;
        end = false;
    }

    struct voter {
        string username;
        string email;
        string password;
        address voterAddress;
    }
    mapping(address => voter) public voterDetails;
    address[] public voters; // Array of address to store address of voters

    function addVoterDetails(
        string memory _username,
        string memory _email,
        string memory _password
    ) public {
        voter memory newVoter = voter({
            username: _username,
            email: _email,
            password: _password,
            voterAddress: msg.sender
        });
        voterDetails[msg.sender] = newVoter;
        voters.push(msg.sender);
    }

    function isVoterExists(address voterAddress) public view returns (bool) {
        //Loop through voters array
        for (uint256 i = 0; i < voters.length; i++) {
            if ((voterAddress) == voters[i]) {
                return false;
            }
        }

        return true;
    }

    function getLoginDetails(address loginAddress)
        public
        view
        returns (
            string memory,
            string memory,
            address,
            string memory
        )
    {
        return (
            voterDetails[loginAddress].email,
            voterDetails[loginAddress].password,
            voterDetails[loginAddress].voterAddress,
            voterDetails[loginAddress].username
        );
    }

    function getAdmin() public view returns (address) {
        // Returns account address used to deploy contract (i.e. admin)
        return admin;
    }

    // Get election start and end values
    function getStart() public view returns (bool) {
        return start;
    }

    function getEnd() public view returns (bool) {
        return end;
    }

    function startElection() public returns (bool) {
        start = true;
        end = false;
        return start;
    }
}
