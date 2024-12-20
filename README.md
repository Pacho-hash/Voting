# Voting

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Introduction
Voting is a decentralized application (DApp) built on the Ethereum blockchain that allows users to create and participate in voting processes. This project aims to provide a transparent and tamper-proof voting system.

## Features
- Create new voting polls
- Participate in existing polls
- View poll results in real-time
- Secure and transparent voting process

## Technologies Used
- **JavaScript**: For the front-end logic and interaction with the blockchain.
- **HTML**: For the structure of the web pages.
- **CSS**: For styling the web pages.
- **Solidity**: For writing the smart contracts that handle the voting logic.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pacho-hash/Voting.git
   ```
   ```bash

   cd Voting
    ```
Install the necessary dependencies:

```bash
npm install
```
Download and install [Ganache](https://archive.trufflesuite.com/ganache/), a personal blockchain for Ethereum development you can use to deploy contracts, develop your applications, and run tests. Make sure Ganache is running.

Compile the smart contracts:
```bash

truffle compile
```
Deploy the smart contracts to the blockchain:
```bash

truffle migrate
```

Run the development server:
```bash

npm start
```
## Usage

Open your web browser and navigate to http://localhost:3000.
Connect your Ethereum wallet (e.g., MetaMask) to the application.
Create a new poll or participate in an existing poll.
View the results of the poll in real-time.

## License
This project is licensed under the MIT License.
