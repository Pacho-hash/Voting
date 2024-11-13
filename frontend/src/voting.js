import Web3 from "web3";
import Voting from "./contracts/Voting.json";

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
const networkId = await web3.eth.net.getId();
const deployedNetwork = Voting.networks[networkId];
const contract = new web3.eth.Contract(Voting.abi, deployedNetwork && deployedNetwork.address);

export default contract;