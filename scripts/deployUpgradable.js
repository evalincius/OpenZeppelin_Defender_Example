const { ethers, upgrades }  = require("hardhat");

async function deploy(name) {
  const Contract = await ethers.getContractFactory(name);
  const mc = await upgrades.deployProxy(Contract);

  return await mc.deployed();
}

async function main() {
  console.log('starting');
  const forwarderAddress = "0x29BDF66472535D23e2379377a98fD346B95Bd3bE";

  const registry = await deploy("NFTMarketplaceWithMetaTransactionsUpgradable");

  console.log(`Forwarder: ${forwarderAddress} \nNFTMarketplaceWithMetaTransactionsUpgradable: ${registry.address}`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}