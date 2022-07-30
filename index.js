var OrderType;
(function (OrderType) {
    OrderType[OrderType["Buy"] = 0] = "Buy";
    OrderType[OrderType["Sell"] = 1] = "Sell";
})(OrderType || (OrderType = {}));

class Receipt {
    constructor(itemID, priceSold, buyer, seller) {
        this.buyer = buyer;
        this.seller = seller;
        this.itemID = itemID;
        this.priceSold = priceSold;
    }
}

class Exchange {
    constructor(itemID) {
        this.itemID = itemID;
        this.buyOrders = [];
        this.sellOrders = [];
        this.ask = -1;
        this.bid = -1;
    }
    add(item) {
        if (item.getOrderType() == OrderType.Buy) {
            if (this.sellOrders.length > 0 && this.checkExecute(item)) {
                var sellOrder = this.removeSellOrder();
                this.calculateMarketPrices();
                return new Receipt(this.itemID, item.price, item.traderID, sellOrder.traderID);
            }
            this.addBuyOrder(item);
            this.calculateMarketPrices();
            return new Receipt(this.itemID, item.price, item.traderID, null);
        }
        else if (item.getOrderType() == OrderType.Sell) {
            if (this.buyOrders.length > 0 && this.checkExecute(item)) {
                var buyOrder = this.removeBuyOrder();
                this.calculateMarketPrices();
                return new Receipt(this.itemID, item.price, buyOrder.traderID, item.traderID);
            }
            this.addSellOrder(item);
            this.calculateMarketPrices();
            return new Receipt(this.itemID, item.price, null, item.traderID);
        }
        else {
            this.calculateMarketPrices();
            return new Receipt(this.itemID, null, null, null);
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
        if (item.orderType == OrderType.Buy) {
            if (item.price >= this.ask)
                return true;
        }
        if (item.orderType == OrderType.Sell) {
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

class Item {
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

class GunsAndButter {
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

export { GunsAndButter };
