import React, { useEffect, useState } from "react";
import contract from "./voting";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const loadCandidates = async () => {
      const count = await contract.methods.candidatesCount().call();
      const candidatesArray = [];
      for (let i = 1; i <= count; i++) {
        const candidate = await contract.methods.candidates(i).call();
        candidatesArray.push(candidate);
      }
      setCandidates(candidatesArray);
    };
    loadCandidates();
  }, []);

  return (
    <div>
      {candidates.map(candidate => (
        <div key={candidate.id}>
          {candidate.name}: {candidate.voteCount} votes
        </div>
      ))}
    </div>
  );
};

export default Candidates;