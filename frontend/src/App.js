import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Voting from './contracts/Voting.json';
import './App.css';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [account, setAccount] = useState('');
  const [votingContract, setVotingContract] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const contract = new web3.eth.Contract(Voting.abi, deployedNetwork && deployedNetwork.address);
      setVotingContract(contract);

      const candidatesCount = await contract.methods.candidatesCount().call();
      const candidatesArray = [];
      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        candidatesArray.push(candidate);
      }
      setCandidates(candidatesArray);
    };
    loadBlockchainData();
  }, []);

  const vote = async (candidateId) => {
    await votingContract.methods.vote(candidateId).send({ from: account });
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Voting DApp</h1>
        <p>Account: {account}</p>
        <ul>
          {candidates.map(candidate => (
            <li key={candidate.id}>
              {candidate.name} - {candidate.voteCount} votes
              <button onClick={() => vote(candidate.id)}>Vote</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
```
