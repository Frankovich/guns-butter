export class Item {
    constructor(itemID, price, traderID, orderType, expirationDate) {
        this.itemID = itemID;
        this.price = price;
        this.traderID = traderID;
        this.orderType = orderType;
        this.expirationDate = expirationDate;
    }
    getItemID() {
        return this.itemID;
    }
    getOrderType() {
        return this.orderType;
    }
    checkIfExpired() {
        return true;
    }
}
