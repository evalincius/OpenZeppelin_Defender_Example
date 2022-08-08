/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();
const { PRIVATE_KEY: privateKey} = process.env;
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.9"
  }
}