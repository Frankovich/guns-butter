"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receipt = void 0;
class Receipt {
    constructor(itemID, priceSold, buyer, seller) {
        this.buyer = buyer;
        this.seller = seller;
        this.itemID = itemID;
        this.priceSold = priceSold;
    }
}
exports.Receipt = Receipt;
