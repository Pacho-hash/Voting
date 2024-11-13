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
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
  
          const networkId = await web3.eth.net.getId();
          if (networkId !== 5777) { // Ensure this matches the network ID in truffle-config.js
            console.error("Please connect to the correct network");
            return;
          }
  
          const deployedNetwork = Voting.networks[networkId];
          if (deployedNetwork) {
            const contract = new web3.eth.Contract(Voting.abi, deployedNetwork.address);
            setVotingContract(contract);
  
            const candidatesCount = await contract.methods.candidatesCount().call();
            const candidatesArray = [];
            for (let i = 1; i <= candidatesCount; i++) {
              const candidate = await contract.methods.candidates(i).call();
              candidatesArray.push(candidate);
            }
            setCandidates(candidatesArray);
          } else {
            console.error("Smart contract not deployed to detected network.");
          }
        } else {
          console.error("Ethereum wallet not detected.");
        }
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };
    loadBlockchainData();
  }, []);

  const vote = async (candidateId) => {
    try {
      await votingContract.methods.vote(candidateId).send({ from: account });
      window.location.reload();
    } catch (error) {
      console.error("Error voting:", error);
    }
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
