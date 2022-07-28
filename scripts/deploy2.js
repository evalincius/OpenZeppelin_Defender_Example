const hre = require("hardhat");
const { writeFileSync } = require('fs');

async function deploy(name, ...params) {
  const Contract = await hre.ethers.getContractFactory(name);
  return await Contract.deploy(...params);
}

async function main() {
  console.log('starting');

  const forwarder = await deploy('Forwarder');
  const registry = await deploy("NFTMarketplaceWithMetaTransactions", forwarder.address);
  console.log('got this far');

  writeFileSync('deploy.json', JSON.stringify({
    Forwarder: forwarder.address,
    NFTMarketplaceWithMetaTransactions: registry.address,
  }, null, 2));

  console.log(`Forwarder: ${forwarder.address}\nNFTMarketplaceWithMetaTransactions: ${registry.address}`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}