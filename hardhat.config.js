/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();
const { privateKey } = require('./secrets.json');
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [privateKey]
    },
    mainnet: {
      url: "https://matic-mainnet.chainstacklabs.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.9"
  }
}