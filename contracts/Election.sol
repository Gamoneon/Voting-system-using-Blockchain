// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;
pragma experimental ABIEncoderV2;

contract Election {
    address public admin;
    uint256 candidateCount;
    uint256 voterCount;
    bool isElectionStarted;
    bool isElectionEnded;
    string electionTitle;
    string electionOrganization;
    string currentElectionPhase;
    string nextElectionPhase;
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
            "Voter Verification",
            "Apply as a Candidate",
            "Voting",
            "Result"
        ];
        currentElectionPhase = electionPhases[electionPhaseIndex];
        nextElectionPhase = electionPhases[electionPhaseIndex + 1];
    }

    struct voter {
        string username;
        string email;
        string password;
        string prn;
        string mobile;
        address voterAddress;
        bool isVerified;
        bool hasVoted;
        bool hasApplied;
        bool isCandidate;
        // bool isDenied;
        // string deniedFor;
        string tagLine;
        uint256 votesCount;
    }

    mapping(address => voter) public voterDetails;
    address[] public voters; // Array of address to store address of voters

    /*------------------------ Voter Verification --------------------------- */

    // Update verification details
    function addVerificationRequest(
        address pendingVoterAddress,
        string memory _prn,
        string memory _mobile
    ) public {
        voterDetails[pendingVoterAddress].hasApplied = true;
        voterDetails[pendingVoterAddress].prn = _prn;
        voterDetails[pendingVoterAddress].mobile = _mobile;
    }

    // Approve verification requests
    function approveVerificationRequests(address pendingVoterAddress) public {
        voterDetails[pendingVoterAddress].hasApplied = false;
        voterDetails[pendingVoterAddress].isVerified = true;
        // if (voterDetails[pendingVoterAddress].isDenied) {
        //     voterDetails[pendingVoterAddress].deniedFor = "";
        //     voterDetails[pendingVoterAddress].isDenied = false;
        // }
    }

    // Deny verification requests
    // function denyVerificationRequests(
    //     address pendingVoterAddress,
    //     string memory _deniedFor
    // ) public {
    //     voterDetails[pendingVoterAddress].hasApplied = false;
    //     voterDetails[pendingVoterAddress].isDenied = true;
    //     voterDetails[pendingVoterAddress].deniedFor = _deniedFor;
    // }

    // sending candidate request

    function addCandidateRequest(
        address pendingVoterAddress,
        string memory _tagLine
    ) public {
        voterDetails[pendingVoterAddress].hasApplied = true;
        voterDetails[pendingVoterAddress].tagLine = _tagLine;
    }

    // Approve candidate requests
    function approveCandidateRequests(address pendingVoterAddress) public {
        voterDetails[pendingVoterAddress].hasApplied = false;
        voterDetails[pendingVoterAddress].isCandidate = true;
        // if (voterDetails[pendingVoterAddress].isDenied) {
        //     voterDetails[pendingVoterAddress].deniedFor = "";
        //     voterDetails[pendingVoterAddress].isDenied = false;
        // }
    }

    // Get all voter details
    function getAllVoterDetails() public view returns (voter[] memory) {
        voter[] memory allVoterDetails = new voter[](voterCount);
        for (uint256 i = 0; i < voterCount; i++) {
            allVoterDetails[i] = voterDetails[voters[i]];
        }
        return allVoterDetails;
    }

    function getVoterDetails(address voterAddress) public view returns (voter memory){
        return voterDetails[voterAddress];
    }

    /*------------------------ Voter Handlers --------------------------- */

    function addVoterDetails(
        string memory _username,
        string memory _email,
        string memory _password
    ) public {
        voter memory newVoter = voter({
            username: _username,
            email: _email,
            password: _password,
            voterAddress: msg.sender,
            prn: "",
            mobile: "",
            votesCount: 0,
            isVerified: false,
            hasVoted: false,
            hasApplied: false,
            isCandidate: false,
            // isDenied: false,
            // deniedFor: "",
            tagLine: ""
        });
        voterDetails[msg.sender] = newVoter;
        voterCount++;
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
            string memory,
            bool
        )
    {
        return (
            voterDetails[loginAddress].email,
            voterDetails[loginAddress].password,
            voterDetails[loginAddress].voterAddress,
            voterDetails[loginAddress].username,
            voterDetails[loginAddress].isVerified
        );
    }

    /*------------------------ Election Handlers --------------------------- */

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

    function changeElectionPhase() public {
        electionPhaseIndex = (electionPhaseIndex + 1) % electionPhases.length;
        currentElectionPhase = electionPhases[electionPhaseIndex];
        nextElectionPhase = electionPhases[
            (electionPhaseIndex + 1) % electionPhases.length
        ];
        if (electionPhaseIndex == electionPhases.length - 1) {
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
            string memory,
            string memory
        )
    {
        return (
            isElectionStarted,
            isElectionEnded,
            electionTitle,
            electionOrganization,
            currentElectionPhase,
            nextElectionPhase
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

    /*------------------------ Voting Handlers --------------------------- */

    function addVote(address voterAddress, address candidateAddress) public {
        voterDetails[voterAddress].hasVoted = true;
        voterDetails[candidateAddress].votesCount++;
    }

    function hasVoted(address voterAddress) public view returns (bool) {
        return voterDetails[voterAddress].hasVoted;
    }
}
