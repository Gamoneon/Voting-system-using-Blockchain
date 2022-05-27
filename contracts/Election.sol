// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;
pragma experimental ABIEncoderV2;

contract Election {
    address public admin;
    uint256 candidateCount;
    uint256 voterCount;
    uint256 pendingRequests;

    struct electionSetup {
        bool isElectionStarted;
        string electionTitle;
        string electionOrganization;
        string currentElectionPhase;
        string nextElectionPhase;
        uint256 electionPhaseIndex;
        string[5] electionPhases;
    }

    struct voter {
        string username;
        string email;
        string password;
        address voterAddress;
        voterElectionData voterElectionDetails;
    }

    struct voterElectionData {
        string prn;
        string mobile;
        uint256 votesCount;
        bool isVerified;
        bool hasVoted;
        bool hasApplied;
        bool isCandidate;
        bool isDenied;
        string tagLine;
    }

    mapping(address => voter) public voterDetails;
    address[] public voters; // Array of address to store address of voters
    electionSetup public electionInstance;

    constructor() public {
        // Initilizing default values
        admin = msg.sender;
        candidateCount = 0;
        voterCount = 0;
        pendingRequests = 0;

        electionInstance = electionSetup({
            isElectionStarted: false,
            electionTitle: "",
            electionOrganization: "",
            electionPhaseIndex: 0,
            electionPhases: [
                "Setup Election",
                "Voter Verification",
                "Candidate Application",
                "Voting",
                "Result"
            ],
            currentElectionPhase: electionInstance.electionPhases[
                electionInstance.electionPhaseIndex
            ],
            nextElectionPhase: electionInstance.electionPhases[
                electionInstance.electionPhaseIndex + 1
            ]
        });
    }

    /*------------------------ Voter Verification --------------------------- */

    // Update verification details
    function addVerificationRequest(
        address pendingVoterAddress,
        string memory _prn,
        string memory _mobile
    ) public {
        voterDetails[pendingVoterAddress]
            .voterElectionDetails
            .hasApplied = true;
        voterDetails[pendingVoterAddress].voterElectionDetails.prn = _prn;
        voterDetails[pendingVoterAddress].voterElectionDetails.mobile = _mobile;
        pendingRequests++;
    }

    // Approve verification requests
    function approveVerificationRequests(address pendingVoterAddress) public {
        voterDetails[pendingVoterAddress]
            .voterElectionDetails
            .hasApplied = false;
        voterDetails[pendingVoterAddress]
            .voterElectionDetails
            .isVerified = true;
        pendingRequests--;
        if (voterDetails[pendingVoterAddress].voterElectionDetails.isDenied) {
            voterDetails[pendingVoterAddress]
                .voterElectionDetails
                .isDenied = false;
        }
    }

    // Deny verification requests
    function denyVerificationRequests(address pendingVoterAddress) public {
        voterDetails[pendingVoterAddress]
            .voterElectionDetails
            .hasApplied = false;
        voterDetails[pendingVoterAddress].voterElectionDetails.isDenied = true;

        pendingRequests--;
    }

    // sending candidate request

    function addCandidateRequest(
        address pendingVoterAddress,
        string memory _tagLine
    ) public {
        voterDetails[pendingVoterAddress]
            .voterElectionDetails
            .hasApplied = true;
        voterDetails[pendingVoterAddress]
            .voterElectionDetails
            .tagLine = _tagLine;
        pendingRequests++;
    }

    // Approve candidate requests
    function approveCandidateRequests(address pendingVoterAddress) public {
        voterDetails[pendingVoterAddress]
            .voterElectionDetails
            .hasApplied = false;
        voterDetails[pendingVoterAddress]
            .voterElectionDetails
            .isCandidate = true;
        pendingRequests--;

        if (voterDetails[pendingVoterAddress].voterElectionDetails.isDenied) {
            voterDetails[pendingVoterAddress]
                .voterElectionDetails
                .isDenied = false;
        }
    }

    function isPendingRequest() public view returns (bool) {
        return (pendingRequests == 0) ? false : true ;
    }

    // Get all voter details
    function getAllVoterDetails() public view returns (voter[] memory) {
        voter[] memory allVoterDetails = new voter[](voterCount);
        for (uint256 i = 0; i < voterCount; i++) {
            allVoterDetails[i] = voterDetails[voters[i]];
        }
        return allVoterDetails;
    }

    function getVoterDetails(address voterAddress)
        public
        view
        returns (voter memory)
    {
        return voterDetails[voterAddress];
    }

    /*------------------------ Voter Handlers --------------------------- */

    function addVoterDetails(
        string memory _username,
        string memory _email,
        string memory _password
    ) public {
        voterElectionData memory newvoterElectionData = voterElectionData({
            prn: "",
            mobile: "",
            votesCount: 0,
            isVerified: false,
            hasVoted: false,
            hasApplied: false,
            isCandidate: false,
            isDenied: false,
            tagLine: ""
        });

        voter memory newVoter = voter({
            username: _username,
            email: _email,
            password: _password,
            voterAddress: msg.sender,
            voterElectionDetails: newvoterElectionData
        });
        voterDetails[msg.sender] = newVoter;
        voterCount++;
        voters.push(msg.sender);
    }

    function isVoterExists(address voterAddress, string memory mail)
        public
        view
        returns (bool)
    {
        //Loop through voters array
        for (uint256 i = 0; i < voters.length; i++) {
            if (
                (voterAddress) == voters[i] ||
                (keccak256(bytes(mail)) ==
                    keccak256(bytes(voterDetails[voters[i]].email)))
            ) {
                return true;
            }
        }
        return false;
    }

    /*------------------------ Election Handlers --------------------------- */

    function getAdmin() public view returns (address) {
        // Returns account address used to deploy contract (i.e. admin)
        return admin;
    }

    function changeElectionPhase() public {
        electionInstance.electionPhaseIndex =
            (electionInstance.electionPhaseIndex + 1) %
            electionInstance.electionPhases.length;
        electionInstance.currentElectionPhase = electionInstance.electionPhases[
            electionInstance.electionPhaseIndex
        ];
        electionInstance.nextElectionPhase = electionInstance.electionPhases[
            (electionInstance.electionPhaseIndex + 1) %
                electionInstance.electionPhases.length
        ];
    }

    function getElectionDetails()
        public
        view
        returns (
            bool,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            electionInstance.isElectionStarted,
            electionInstance.electionTitle,
            electionInstance.electionOrganization,
            electionInstance.currentElectionPhase,
            electionInstance.nextElectionPhase
        );
    }

    function startElection(
        string memory _electionTitle,
        string memory _electionOrganization
    ) public {
        electionInstance.isElectionStarted = true;
        electionInstance.electionTitle = _electionTitle;
        electionInstance.electionOrganization = _electionOrganization;
        changeElectionPhase();
    }

    /*------------------------ Voting Handlers --------------------------- */

    function addVote(address voterAddress, address candidateAddress) public {
        voterDetails[voterAddress].voterElectionDetails.hasVoted = true;
        voterDetails[candidateAddress].voterElectionDetails.votesCount++;
    }

    function hasVoted(address voterAddress) public view returns (bool) {
        return voterDetails[voterAddress].voterElectionDetails.hasVoted;
    }

    /*------------------------ Reset Voter & Elections Details --------------------------- */

    function resetElection() public {
        
        //Reset Election Details
        electionInstance.isElectionStarted = false;
        electionInstance.electionTitle = "";
        electionInstance.electionOrganization = "";
        electionInstance.electionPhaseIndex = 0;
        electionInstance.currentElectionPhase = electionInstance.electionPhases[
            electionInstance.electionPhaseIndex
        ];
        electionInstance.nextElectionPhase = electionInstance.electionPhases[
            electionInstance.electionPhaseIndex + 1
        ];

        //Reset Voter Election Details
        for (uint256 i = 0; i < voters.length; i++) {
        address voterAddress = voters[i];
        voterDetails[voterAddress].voterElectionDetails.prn= "";
        voterDetails[voterAddress].voterElectionDetails.mobile= "";
        voterDetails[voterAddress].voterElectionDetails.votesCount= 0;
        voterDetails[voterAddress].voterElectionDetails.isVerified= false;
        voterDetails[voterAddress].voterElectionDetails.hasVoted= false;
        voterDetails[voterAddress].voterElectionDetails.hasApplied= false;
        voterDetails[voterAddress].voterElectionDetails.isCandidate= false;
        voterDetails[voterAddress].voterElectionDetails.isDenied= false;
        voterDetails[voterAddress].voterElectionDetails.tagLine= "";
        }
    }
}
