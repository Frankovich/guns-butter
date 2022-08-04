"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exchange = void 0;
const OrderTypeEnum_1 = require("./OrderTypeEnum");
const Receipt_1 = require("./Receipt");
const ReceiptTypeEnum_1 = require("./ReceiptTypeEnum");
class Exchange {
    constructor(itemID) {
        this.itemID = itemID;
        this.buyOrders = [];
        this.sellOrders = [];
        this.ask = -1;
        this.bid = -1;
    }
    add(item) {
        if (item.orderType == OrderTypeEnum_1.OrderType.LimitBuy || item.orderType == OrderTypeEnum_1.OrderType.LimitSell) {
            return this.limitOrder(item);
        }
        else if (item.orderType == OrderTypeEnum_1.OrderType.MarketBuy || item.orderType == OrderTypeEnum_1.OrderType.MarketSell) {
            return this.marketOrder(item);
        }
        return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.Invalid, this.itemID, null, null, null);
    }
    limitOrder(item) {
        if (item.orderType == OrderTypeEnum_1.OrderType.LimitBuy) {
            if (this.sellOrders.length > 0 && this.checkExecute(item)) {
                var sellOrder = this.removeSellOrder();
                this.calculateMarketPrices();
                return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.LimitBuyOrderExecuted, this.itemID, item.price, item.traderID, sellOrder.traderID);
            }
            this.addBuyOrder(item);
            this.calculateMarketPrices();
            return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.BuyAddedToExchange, this.itemID, item.price, item.traderID, null);
        }
        else if (item.orderType == OrderTypeEnum_1.OrderType.LimitSell) {
            if (this.buyOrders.length > 0 && this.checkExecute(item)) {
                var buyOrder = this.removeBuyOrder();
                this.calculateMarketPrices();
                return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.LimitSellOrderExecuted, this.itemID, item.price, buyOrder.traderID, item.traderID);
            }
            this.addSellOrder(item);
            this.calculateMarketPrices();
            return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.SellAddedToExchange, this.itemID, item.price, null, item.traderID);
        }
        else {
            this.calculateMarketPrices();
            return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.Invalid, this.itemID, null, null, null);
        }
    }
    marketOrder(item) {
        if (item.orderType == OrderTypeEnum_1.OrderType.MarketBuy) {
            if (this.sellOrders.length > 0) {
                var sellOrder = this.removeSellOrder();
                this.calculateMarketPrices();
                return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.MarketBuyExecuted, this.itemID, item.price, item.traderID, sellOrder.traderID);
            }
            this.calculateMarketPrices();
            return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.NoSellOrders, this.itemID, item.price, item.traderID, null);
        }
        else if (item.orderType == OrderTypeEnum_1.OrderType.MarketSell) {
            if (this.buyOrders.length > 0) {
                var buyOrder = this.removeBuyOrder();
                this.calculateMarketPrices();
                return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.MarketSellExecuted, this.itemID, item.price, buyOrder.traderID, item.traderID);
            }
            return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.NoBuyOrders, this.itemID, item.price, null, item.traderID);
        }
        else {
            this.calculateMarketPrices();
            return new Receipt_1.Receipt(ReceiptTypeEnum_1.ReceiptType.Invalid, this.itemID, null, null, null);
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
        if (item.orderType == OrderTypeEnum_1.OrderType.LimitBuy) {
            if (item.price >= this.ask)
                return true;
        }
        if (item.orderType == OrderTypeEnum_1.OrderType.LimitSell) {
            if (item.price <= this.bid)
                return true;
        }
        return false;
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