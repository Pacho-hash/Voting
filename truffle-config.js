module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // Change to 8545
      network_id: "*" // Ensure it matches your requirement
    }
  },
  compilers: {
    solc: {
      version: "0.8.0" // Specify the Solidity compiler version
    }
  }
};