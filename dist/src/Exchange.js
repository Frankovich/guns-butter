"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exchange = void 0;
const OrderType_1 = require("./OrderType");
const Receipt_1 = require("./Receipt");
class Exchange {
    constructor(itemID) {
        this.itemID = itemID;
        this.buyOrders = [];
        this.sellOrders = [];
        this.ask = -1;
        this.bid = -1;
    }
    add(item) {
        if (item.getOrderType() == OrderType_1.OrderType.Buy) {
            if (this.sellOrders.length > 0 && this.checkExecute(item)) {
                var sellOrder = this.removeSellOrder();
                this.calculateMarketPrices();
                return new Receipt_1.Receipt(this.itemID, item.price, item.traderID, sellOrder.traderID);
            }
            this.addBuyOrder(item);
            this.calculateMarketPrices();
            return new Receipt_1.Receipt(this.itemID, item.price, item.traderID, null);
        }
        else if (item.getOrderType() == OrderType_1.OrderType.Sell) {
            if (this.buyOrders.length > 0 && this.checkExecute(item)) {
                var buyOrder = this.removeBuyOrder();
                this.calculateMarketPrices();
                return new Receipt_1.Receipt(this.itemID, item.price, buyOrder.traderID, item.traderID);
            }
            this.addSellOrder(item);
            this.calculateMarketPrices();
            return new Receipt_1.Receipt(this.itemID, item.price, null, item.traderID);
        }
        else {
            this.calculateMarketPrices();
            return new Receipt_1.Receipt(this.itemID, null, null, null);
        }
    }
    calculateMarketPrices() {
        this.calculateBid();
        this.calculateAsk();
    }
    calculateBid() {
        if (this.buyOrders.length > 0) {
            this.bid = this.buyOrders[0].price;
            return this.bid;
        }
        else {
            return -1;
        }
    }
    calculateAsk() {
        if (this.sellOrders.length > 0) {
            this.ask = this.sellOrders[0].price;
            return this.ask;
        }
        else {
            return -1;
        }
    }
    checkExecute(item) {
        if (item.orderType == OrderType_1.OrderType.Buy) {
            if (item.price >= this.ask)
                return true;
        }
        if (item.orderType == OrderType_1.OrderType.Sell) {
            if (item.price <= this.bid)
                return true;
        }
        return false;
    }
    getItemID() {
        return this.itemID;
    }
    addBuyOrder(item) {
        this.buyOrders.push(item);
        this.buyOrders.sort(this.comparePrice).reverse();
        return true;
    }
    addSellOrder(item) {
        this.sellOrders.push(item);
        this.sellOrders.sort(this.comparePrice).reverse();
        return true;
    }
    removeBuyOrder() {
        var itemToReturn = this.buyOrders[0];
        delete this.buyOrders[0];
        this.buyOrders = this.buyOrders.filter((x) => x !== undefined);
        return itemToReturn;
    }
    removeSellOrder() {
        var itemToReturn = this.sellOrders[0];
        delete this.sellOrders[0];
        this.sellOrders = this.sellOrders.filter((x) => x !== undefined);
        return itemToReturn;
    }
    logBuyOrders() {
        for (var val of this.buyOrders) {
            console.log(val);
        }
    }
    logSellOrders() {
        for (var val of this.sellOrders) {
            console.log(val);
        }
    }
    getBid() {
        return this.bid;
    }
    getAsk() {
        return this.ask;
    }
    comparePrice(a, b) {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
exports.Exchange = Exchange;
//# sourceMappingURL=Exchange.js.map