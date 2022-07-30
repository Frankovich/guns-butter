import { Exchange } from "./Exchange";
import { Item } from "./Item";
import { OrderType } from "./OrderType";
export class GunsAndButter {
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
    createItem(itemID, price, traderID, orderType, expirationDate) {
        var item = new Item(itemID, price, traderID, orderType, expirationDate);
        return item;
    }
    addItem(itemID, price, traderID, orderType, expirationDate) {
        var item = new Item(itemID, price, traderID, orderType, expirationDate);
        if (item.orderType == OrderType.Buy) {
            for (var val of this.exchanges) {
                if (val.itemID == item.getItemID()) {
                    this.receipts.push(val.add(item));
                    this.itemCount += 1;
                    return true;
                }
            }
            var exchange = new Exchange(item.getItemID());
            this.receipts.push(exchange.add(item));
            this.addExchange(exchange);
            this.itemCount += 1;
            return true;
        }
        else if (item.orderType == OrderType.Sell) {
            for (var val of this.exchanges) {
                if (val.itemID == item.getItemID()) {
                    this.receipts.push(val.add(item));
                    this.itemCount += 1;
                    return true;
                }
            }
            var exchange = new Exchange(item.getItemID());
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
            bids.push(this.exchanges[i].getBid());
        }
        return bids;
    }
    getAsks() {
        var asks = [];
        for (var i = 0; i < this.exchanges.length; i++) {
            this.exchanges[i].calculateAsk();
            asks.push(this.exchanges[i].getAsk());
        }
        return asks;
    }
    logBuyOrders() {
        console.log("buy orders:");
        for (var val of this.exchanges) {
            val.logBuyOrders();
        }
    }
    logSellOrders() {
        console.log("sell orders:");
        for (var val of this.exchanges) {
            val.logSellOrders();
        }
    }
    logReport() {
        console.log("# of exchanges: ", this.exchangeCount);
        console.log("# of items ", this.itemCount);
    }
}
module.exports = GunsAndButter;
