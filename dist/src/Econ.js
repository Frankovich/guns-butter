"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Econ = void 0;
const Exchange_1 = require("./Exchange");
const Item_1 = require("./Item");
const OrderTypeEnum_1 = require("./OrderTypeEnum");
class Econ {
    constructor() {
        this.exchanges = [];
        this.exchangeCount = 0;
        this.itemCount = 0;
        this.receipts = [];
    }
    addExchange(exchange) {
        this.exchanges.push(exchange);
        this.exchangeCount += 1;
    }
    createItem(itemID, price, traderID, order, expirationDate) {
        var orderType;
        if (order == "limit buy") {
            orderType = OrderTypeEnum_1.OrderType.LimitBuy;
        }
        else if (order == "limit sell") {
            orderType = OrderTypeEnum_1.OrderType.LimitSell;
        }
        else {
            orderType = OrderTypeEnum_1.OrderType.Invalid;
        }
        var item = new Item_1.Item(itemID, price, traderID, orderType, expirationDate);
        return item;
    }
    add(itemID, price, traderID, orderType, expirationDate) {
        var item = this.createItem(itemID, price, traderID, orderType, expirationDate);
        console.log(item);
        if (item.orderType == OrderTypeEnum_1.OrderType.LimitBuy) {
            for (var val of this.exchanges) {
                if (val.itemID == item.itemID) {
                    this.receipts.push(val.add(item));
                    this.itemCount += 1;
                    return true;
                }
            }
            var exchange = new Exchange_1.Exchange(item.itemID);
            this.receipts.push(exchange.add(item));
            this.addExchange(exchange);
            this.itemCount += 1;
            return true;
        }
        else if (item.orderType == OrderTypeEnum_1.OrderType.LimitSell) {
            for (var val of this.exchanges) {
                if (val.itemID == item.itemID) {
                    this.receipts.push(val.add(item));
                    this.itemCount += 1;
                    return true;
                }
            }
            var exchange = new Exchange_1.Exchange(item.itemID);
            this.receipts.push(exchange.add(item));
            this.addExchange(exchange);
            this.itemCount += 1;
            return true;
        }
        else {
            return false;
        }
    }
    getReceipts() {
        return this.receipts;
    }
    calcBids() {
        for (var i = 0; i < this.exchanges.length; i++) {
            this.exchanges[i].calculateBid();
        }
    }
    calcAsks() {
        for (var i = 0; i < this.exchanges.length; i++) {
            this.exchanges[i].calculateAsk();
        }
    }
    getBids() {
        var bids = [];
        for (var i = 0; i < this.exchanges.length; i++) {
            this.exchanges[i].calculateAsk();
            bids.push(this.exchanges[i].bid);
        }
        return bids;
    }
    getAsks() {
        var asks = [];
        for (var i = 0; i < this.exchanges.length; i++) {
            this.exchanges[i].calculateAsk();
            asks.push(this.exchanges[i].ask);
        }
        return asks;
    }
    logBuyOrders() {
        console.log("buy orders:");
        var log = [];
        for (var val of this.exchanges) {
            log.push(val.buyOrders);
        }
    }
    logSellOrders() {
        console.log("sell orders:");
        var log = [];
        for (var val of this.exchanges) {
            log.push(val.sellOrders);
        }
    }
    logReport() {
        console.log("# of exchanges: ", this.exchangeCount);
        console.log("# of items ", this.itemCount);
    }
}
exports.Econ = Econ;
//# sourceMappingURL=Econ.js.map