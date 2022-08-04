describe("NFTMarketplaceWithMetaTransactions", function() {
    it("Should create and execute market sales", async function() {
        /* deploy the marketplace */

        // const ForwarderContract = await ethers.getContractFactory("Forwarder")
        // const forwarder = await ForwarderContract.deploy()
        // await forwarder.deployed()
        // const forwarderAddress = forwarder.address


        const Contract = await ethers.getContractFactory("NFTMarketplaceWithMetaTransactions")
        const mc = await upgrades.deployProxy(Contract);
        const market = await mc.deployed()

      
          /* create two tokens */
        await market.createToken("https://www.mytokenlocation.com")
        await market.createToken("https://www.mytokenlocation2.com")
           /* execute sale of token to another user */

        /* query for and return the unsold items */
        items = await market.fetchAllNfts()

        items = await Promise.all(items.map(async i => {
        const tokenUri = await market.tokenURI(i.tokenId)
        let item = {
            tokenId: i.tokenId.toString(),
            owner: i.owner,
            tokenUri
        }
        return item
        }))
        console.log('fetchAllNfts: ', items)


    })

    it("Should create and execute market sales2", async function() {
        /* deploy the marketplace */
        const Contract = await ethers.getContractFactory("NFTMarketplaceWithMetaTransactions")
        const mc = await upgrades.deployProxy(Contract);
        const market = await mc.deployed()

      
          /* create two tokens */
        await market.createToken("https://www.mytokenlocation.com")
        await market.createToken("https://www.mytokenlocation2.com")

        const [_, buyerAddress] = await ethers.getSigners()

           /* execute sale of token to another user */

        /* query for and return the unsold items */
        items = await market.fetchMyNFTs()

        items = await Promise.all(items.map(async i => {
        const tokenUri = await market.tokenURI(i.tokenId)
        let item = {
            tokenId: i.tokenId.toString(),
            owner: i.owner,
            tokenUri
        }
        return item
        }))
        console.log('fetchMyNFTs: ', items)

        
    })
})