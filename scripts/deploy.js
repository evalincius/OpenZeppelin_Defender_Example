const hre = require("hardhat");
const { writeFileSync } = require('fs');

async function deploy(name, ...params) {
  const Contract = await hre.ethers.getContractFactory(name);
  return await Contract.deploy(...params);
}

async function main() {
  console.log('starting');

  // const forwarder = await deploy('Forwarder');
  const registry = await deploy("NFTMarketplaceWithMetaTransactions", "0x29BDF66472535D23e2379377a98fD346B95Bd3bE");
  console.log('got this far');



  console.log(`NFTMarketplaceWithMetaTransactions: ${registry.address}`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}