// scripts/upgrade_box.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const contract = await ethers.getContractFactory('NFTMarketplaceWithMetaTransactionsUpgradable');
  console.log('Upgrading Contract...');
  await upgrades.upgradeProxy('0xE05973E6a61d07Ebf38FBCEd5F72A22e0FE7E155', contract);
  console.log('Contract upgraded');
}

main();