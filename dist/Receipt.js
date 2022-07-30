export class Receipt {
    constructor(itemID, priceSold, buyer, seller) {
        this.buyer = buyer;
        this.seller = seller;
        this.itemID = itemID;
        this.priceSold = priceSold;
    }
}
