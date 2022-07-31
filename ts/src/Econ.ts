import { Exchange } from "./Exchange";
import { Item } from "./Item";
import { OrderType } from "./OrderType";
import { Receipt } from "./Receipt";

export class Econ {
  exchanges: Exchange[];
  exchangeCount: number;
  itemCount: number;
  receipts: Receipt[];

  constructor() {
    this.exchanges = [];
    this.exchangeCount = 0;
    this.itemCount = 0;
    this.receipts = [];
  }

  addExchange(exchange: Exchange) {
    this.exchanges.push(exchange);
    this.exchangeCount += 1;
  }

  createItem(
    itemID: string,
    price: number,
    traderID: string,
    order: string,
    expirationDate: Date
  ): Item {
    var orderType: OrderType;
    if (order == "buy") {
      orderType = OrderType.Buy;
    } else if (order == "sell") {
      orderType = OrderType.Sell;
    } else {
      orderType = OrderType.Invalid;
    }
    var item: Item = new Item(
      itemID,
      price,
      traderID,
      orderType,
      expirationDate
    );
    return item;
  }

  add(
    itemID: string,
    price: number,
    traderID: string,
    orderType: string,
    expirationDate: Date
  ): Boolean {
    var item: Item = this.createItem(
      itemID,
      price,
      traderID,
      orderType,
      expirationDate
    );
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
    } else if (item.orderType == OrderType.Sell) {
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
    } else {
      return false;
    }
  }

  getReceipts(): Receipt[] {
    return this.receipts;
  }

  calcBids(): void {
    for (var i = 0; i < this.exchanges.length; i++) {
      this.exchanges[i].calculateBid();
    }
  }

  calcAsks(): void {
    for (var i = 0; i < this.exchanges.length; i++) {
      this.exchanges[i].calculateAsk();
    }
  }

  getBids(): number[] {
    var bids: number[] = [];
    for (var i = 0; i < this.exchanges.length; i++) {
      this.exchanges[i].calculateAsk();
      bids.push(this.exchanges[i].getBid());
    }
    return bids;
  }

  getAsks(): number[] {
    var asks: number[] = [];
    for (var i = 0; i < this.exchanges.length; i++) {
      this.exchanges[i].calculateAsk();
      asks.push(this.exchanges[i].getAsk());
    }
    return asks;
  }

  logBuyOrders(): void {
    console.log("buy orders:");
    for (var val of this.exchanges) {
      val.logBuyOrders();
    }
  }

  logSellOrders(): void {
    console.log("sell orders:");
    for (var val of this.exchanges) {
      val.logSellOrders();
    }
  }

  logReport(): void {
    console.log("# of exchanges: ", this.exchangeCount);
    console.log("# of items ", this.itemCount);
  }
}
