import { Item } from "./Item";
import { OrderType } from "./OrderType";
import { Receipt } from "./Receipt";

export class Exchange {
  itemID: string;
  buyOrders: Item[];
  sellOrders: Item[];
  ask: number;
  bid: number;

  constructor(itemID: string) {
    this.itemID = itemID;
    this.buyOrders = [];
    this.sellOrders = [];
    this.ask = -1;
    this.bid = -1;
  }

  add(item: Item): Receipt {
    if (item.getOrderType() == OrderType.Buy) {
      if (this.sellOrders.length > 0 && this.checkExecute(item)) {
        var sellOrder = this.removeSellOrder();
        this.calculateMarketPrices();
        return new Receipt(
          this.itemID,
          item.price,
          item.traderID,
          sellOrder.traderID
        );
      }
      this.addBuyOrder(item);
      this.calculateMarketPrices();
      return new Receipt(this.itemID, item.price, item.traderID, null);
    } else if (item.getOrderType() == OrderType.Sell) {
      if (this.buyOrders.length > 0 && this.checkExecute(item)) {
        var buyOrder = this.removeBuyOrder();
        this.calculateMarketPrices();
        return new Receipt(
          this.itemID,
          item.price,
          buyOrder.traderID,
          item.traderID
        );
      }
      this.addSellOrder(item);
      this.calculateMarketPrices();
      return new Receipt(this.itemID, item.price, null, item.traderID);
    } else {
      this.calculateMarketPrices();
      return new Receipt(this.itemID, null, null, null);
    }
  }

  calculateMarketPrices(): void {
    this.calculateBid();
    this.calculateAsk();
  }

  calculateBid(): number {
    if (this.buyOrders.length > 0) {
      this.bid = this.buyOrders[0].price;
      return this.bid;
    } else {
      return -1;
    }
  }

  calculateAsk(): number {
    if (this.sellOrders.length > 0) {
      this.ask = this.sellOrders[0].price;
      return this.ask;
    } else {
      return -1;
    }
  }

  checkExecute(item: Item): boolean {
    if (item.orderType == OrderType.Buy) {
      if (item.price >= this.ask) return true;
    }
    if (item.orderType == OrderType.Sell) {
      if (item.price <= this.bid) return true;
    }
    return false;
  }

  getItemID(): string {
    return this.itemID;
  }

  addBuyOrder(item: Item): boolean {
    this.buyOrders.push(item);
    this.buyOrders.sort(this.comparePrice).reverse();
    return true;
  }

  addSellOrder(item: Item): boolean {
    this.sellOrders.push(item);
    this.sellOrders.sort(this.comparePrice).reverse();
    return true;
  }

  removeBuyOrder(): Item {
    var itemToReturn = this.buyOrders[0];
    delete this.buyOrders[0];
    this.buyOrders = this.buyOrders.filter((x) => x !== undefined);
    return itemToReturn;
  }

  removeSellOrder(): Item {
    var itemToReturn = this.sellOrders[0];
    delete this.sellOrders[0];
    this.sellOrders = this.sellOrders.filter((x) => x !== undefined);
    return itemToReturn;
  }

  logBuyOrders(): void {
    for (var val of this.buyOrders) {
      console.log(val);
    }
  }

  logSellOrders(): void {
    for (var val of this.sellOrders) {
      console.log(val);
    }
  }

  getBid(): number {
    return this.bid;
  }

  getAsk(): number {
    return this.ask;
  }

  comparePrice(a: Item, b: Item): number {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    } else {
      return 0;
    }
  }
}
