const { ethers, upgrades }  = require("hardhat");
const { writeFileSync } = require('fs');

async function deploy(name) {
  const Contract = await ethers.getContractFactory(name);
  const mc = await upgrades.deployProxy(Contract);

  return await mc.deployed();
}

async function main() {
  console.log('starting');

  const registry = await deploy("NFTMarketplaceWithMetaTransactions");
  console.log('got this far');

  writeFileSync('deploy.json', JSON.stringify({
    Forwarder: "0x29BDF66472535D23e2379377a98fD346B95Bd3bE",
    NFTMarketplaceWithMetaTransactions: registry.address,
  }, null, 2));

  console.log(`Forwarder: 0x29BDF66472535D23e2379377a98fD346B95Bd3bE \nNFTMarketplaceWithMetaTransactions: ${registry.address}`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}