import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Voting from './contracts/Voting.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, ProgressBar, Image } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [account, setAccount] = useState('');
  const [votingContract, setVotingContract] = useState(null);
  const socket = io('http://localhost:4000'); // Update with your server URL

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          const networkId = await web3.eth.net.getId();
          const deployedNetwork = Voting.networks[networkId];
          if (deployedNetwork) {
            const contract = new web3.eth.Contract(Voting.abi, deployedNetwork.address);
            setVotingContract(contract);

            const candidatesCount = await contract.methods.candidatesCount().call();
            const candidatesArray = [];
            for (let i = 1; i <= candidatesCount; i++) {
              const candidate = await contract.methods.candidates(i).call();
              candidate.logoUrl = `./logos/logo${i}.png`;
              candidatesArray.push(candidate);
            }
            setCandidates(candidatesArray);

            socket.on('voteUpdate', (updatedCandidates) => {
              setCandidates(updatedCandidates);
              toast.info('Vote count updated!');
            });
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
      socket.emit('voteCasted', candidateId);
      toast.success('Vote casted successfully!');
    } catch (error) {
      console.error("Error voting:", error);
      toast.error('Error casting vote');
    }
  };

  const totalVotes = candidates.reduce((sum, candidate) => sum + Number(candidate.voteCount), 0);
  const colors = ['#ff6347', '#ff69b4', '#ffa500', '#1e90ff', '#32cd32'];

  return (
    <Container className="App">
      <ToastContainer />
      <header className="App-header">
        <h1 className="my-4">Voting App</h1>
        <p className="account-info">Account: {account}</p>
        <Row>
          {candidates.map((candidate, index) => (
            <Col key={candidate.id} md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>
                    <Image src={candidate.logoUrl} roundedCircle className="candidate-logo" />
                    {candidate.name}
                  </Card.Title>
                  <ProgressBar
                    now={(Number(candidate.voteCount) / totalVotes) * 100}
                    label={`${candidate.voteCount} votes`}
                    variant="info"
                  />
                  <Button className="mt-2" variant="danger" onClick={() => vote(candidate.id)}>Vote</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="my-4">
          <Col className="text-center">
            <h2>Total Voters: {totalVotes}</h2>
            <div className="large-progress-bar">
              <CircularProgressbar
                value={totalVotes}
                text={`${totalVotes} votes`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: colors[Math.floor(Math.random() * colors.length)],
                  trailColor: "#d6d6d6"
                })}
              />
            </div>
          </Col>
        </Row>
        <Row>
          {candidates.map((candidate, index) => (
            <Col key={candidate.id} md={3} className="text-center">
              <h5>{candidate.name}</h5>
              <div className="small-progress-bar">
                <CircularProgressbar
                  value={(Number(candidate.voteCount) / totalVotes) * 100}
                  text={`${candidate.voteCount}`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: colors[index % colors.length],
                    trailColor: "#d6d6d6",
                    backgroundImage: `url(${candidate.logoUrl})`,
                    backgroundSize: 'cover'
                  })}
                />
              </div>
            </Col>
          ))}
        </Row>
      </header>
    </Container>
  );
}

export default App;
