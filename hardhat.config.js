/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")
require('dotenv').config();

const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
      chainId: 31337
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      // accounts: [process.env.privateKey]
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}