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
    add(itemID, price, traderID, orderType, expirationDate) {
        var item = this.createItem(itemID, price, traderID, orderType, expirationDate);
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
    createItem(itemID, price, traderID, order, expirationDate) {
        var orderType;
        switch (order) {
            case "limit buy":
                orderType = OrderTypeEnum_1.OrderType.LimitBuy;
                break;
            case "limit sell":
                orderType = OrderTypeEnum_1.OrderType.LimitSell;
                break;
            case "market buy":
                orderType = OrderTypeEnum_1.OrderType.MarketBuy;
                break;
            case "market sell":
                orderType = OrderTypeEnum_1.OrderType.MarketSell;
                break;
            default:
                orderType = OrderTypeEnum_1.OrderType.Invalid;
        }
        var item = new Item_1.Item(itemID, price, traderID, orderType, expirationDate);
        return item;
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