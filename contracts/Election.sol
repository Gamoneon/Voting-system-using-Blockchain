// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Election {
    address public admin;
    uint256 candidateCount;
    uint256 voterCount;
    bool isElectionStarted;
    bool isElectionEnded;
    string electionTitle;
    string electionOrganization;
    string currentElectionPhase;
    uint256 electionPhaseIndex;
    string[] public electionPhases;

    constructor() public {
        // Initilizing default values
        admin = msg.sender;
        candidateCount = 0;
        voterCount = 0;
        isElectionStarted = false;
        isElectionEnded = false;
        electionTitle = "";
        electionOrganization = "";
        electionPhaseIndex = 0;
        electionPhases = [
            "None",
            "Registration",
            "Apply as a Candidate",
            "Voting",
            "Result"
        ];
        currentElectionPhase = electionPhases[electionPhaseIndex];
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
                return true;
            }
        }
        return false;
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

    // Get election isElectionStarted and isElectionEnded values
    function getStart() public view returns (bool) {
        return isElectionStarted;
    }

    function getEnd() public view returns (bool) {
        return isElectionEnded;
    }

    function getElectionPhasesCount() public view returns (uint256 count) {
        return electionPhases.length;
    }

    function changeElectionPhase() public {
        electionPhaseIndex =
            (electionPhaseIndex + 1) %
            getElectionPhasesCount();
        currentElectionPhase = electionPhases[electionPhaseIndex];
        if (electionPhaseIndex == getElectionPhasesCount() - 1) {
            isElectionEnded = true;
        }
    }

    function getElectionDetails()
        public
        view
        returns (
            bool,
            bool,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            isElectionStarted,
            isElectionEnded,
            electionTitle,
            electionOrganization,
            currentElectionPhase
        );
    }

    function startElection(
        string memory _electionTitle,
        string memory _electionOrganization
    ) public {
        isElectionStarted = true;
        electionTitle = _electionTitle;
        electionOrganization = _electionOrganization;
        changeElectionPhase();
    }
}
