# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.


---
## Scripts explained

Scripts stored in /scripts folder:

- deploy.js
    - deploy non upgradable Smart Contract to blockchain
- deployUpgradable.js 
    - deploy upgradable Smart Contract to blockchain
- sign.js
    - sign the meta transaction request with your wallets private key
- relay.js
    - send signed meta transaction request to relayer that is configured on https://defender.openzeppelin.com/#/relay
- upload.js
    - uploads comppiled relayer code to openzeppelin autotask https://defender.openzeppelin.com/#/autotask


---
## Run following tasks to start project localy

To start local node type: 
    `npx hardhat node`

To start nextJS app localy type:
    `npm run dev`

To deploy smart contract to local node type:
    `npx hardhat run scripts/deployUpgradable.js --network localhost`

To mint token on local use since relayer is not configured for local development:
    `http://localhost:3000/create-nft/create-item-with-gas`

---
## Run following tasks to deploy Smart Contract to Polygon Mumbai Testnet

To start local node type: 
    `npx hardhat run scripts/deployUpgradable.js --network mumbai`

