const { ethers } = require('hardhat');
const { signMetaTxRequest } = require('../src/signer');
const { readFileSync, writeFileSync } = require('fs');

function getInstance(name) {
  const address = JSON.parse(readFileSync('deploy.json'))[name];
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`);
  return ethers.getContractFactory(name).then(f => f.attach(address));
}

async function main() {
  const forwarder = await getInstance('MinimalForwarder');
  const registry = await getInstance("NFTMarketplaceWithMetaTransactions");

  const { NAME: name, PRIVATE_KEY: signer } = process.env;

  const from = new ethers.Wallet(signer).address;
  

  //TODO update
  //const data = registry.interface.encodeFunctionData('fetchMarketItems');

  const price = ethers.utils.parseUnits('1', 'ether')
  console.log(price);

  const listingPrice = { value: price }

  const data = registry.interface.encodeFunctionData('createToken', ["Testing!!", price]);

  const result = await signMetaTxRequest(signer, forwarder, {
    to: registry.address, from, data
  });

  writeFileSync('tmp/request.json', JSON.stringify(result, null, 2));
  console.log(`Signature: `, result.signature);
  console.log(`Request: `, result.request);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}