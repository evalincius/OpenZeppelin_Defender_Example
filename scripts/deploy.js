const hre = require("hardhat");
const { writeFileSync } = require('fs');

async function deploy(name, ...params) {
  const Contract = await hre.ethers.getContractFactory(name);
  return await Contract.deploy(...params);
}

async function main() {
  console.log('starting');

  const forwarder = await deploy('Forwarder');
  //const registry = await deploy("NFTMarketplaceWithMetaTransactions", forwarder.address);
  console.log('got this far');



  console.log(`Forwarder: ${forwarder.address}`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}