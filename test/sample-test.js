describe("NFTMarket", function() {
    it("Should create and execute market sales", async function() {
        /* deploy the marketplace */
        const Market = await ethers.getContractFactory("NFTMarket")
        const market = await Market.deploy()
        await market.deployed()
        const marketAddress = market.address

      
        let listingPrice = await market.getListingPrice()
        listingPrice = listingPrice.toString()

        const auctionPrice = ethers.utils.parseUnits('1', 'ether')

          /* create two tokens */
        await market.createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice })
        await market.createToken("https://www.mytokenlocation2.com", auctionPrice, { value: listingPrice })

        const [_, buyerAddress] = await ethers.getSigners()

           /* execute sale of token to another user */
        await market.connect(buyerAddress).createMarketSale(1, { value: auctionPrice })

        /* resell a token */
        await market.connect(buyerAddress).resellToken(1, auctionPrice, { value: listingPrice })

        /* query for and return the unsold items */
        items = await market.fetchMarketItems()
        items = await Promise.all(items.map(async i => {
        const tokenUri = await market.tokenURI(i.tokenId)
        let item = {
            price: i.price.toString(),
            tokenId: i.tokenId.toString(),
            seller: i.seller,
            owner: i.owner,
            tokenUri
        }
        return item
        }))
        console.log('items: ', items)
    })
})