// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    event VotedEvent(uint indexed candidateId);

    constructor() {
        addCandidate("Cyprus West University");
        addCandidate("American University of Cyprus");
        addCandidate("Anadolu University Nicosia Campus");
        addCandidate("Arkin University of Creative Arts and Design");
        addCandidate("Ataturk Teacher Training Academy");
        addCandidate("Bahcesehir Cyprus University");
        addCandidate("University of City Island");
        addCandidate("Cyprus Health and Social Sciences University");
        addCandidate("Cyprus International University");
        addCandidate("Cyprus Science University");
        addCandidate("Cyprus Social Sciences University");
        addCandidate("Eastern Mediterranean University");
        addCandidate("European Leadership University");
        addCandidate("European University of Lefke");
        addCandidate("Final International University");
        addCandidate("Girne American University");
        addCandidate("International Business Management School");
        addCandidate("Istanbul Technical University TRNC Education-Research Campus");
        addCandidate("University of Kyrenia");
        addCandidate("University of Mediterranean Karpasia");
        addCandidate("Middle East Technical University Northern Cyprus Campus");
        addCandidate("Near East University");
        addCandidate("Netkent Mediterranean Research and Science University");
        addCandidate("University of the West of Scotland");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");

        candidates[_candidateId].voteCount++;

        emit VotedEvent(_candidateId);
    }

    function resetVotes(string memory secret) public {
        require(keccak256(abi.encodePacked(secret)) == keccak256(abi.encodePacked("meow0709")), "Invalid secret word.");
        for (uint i = 1; i <= candidatesCount; i++) {
            candidates[i].voteCount = 0;
        }
    }
}