import { OrderType } from "./OrderType";

export class Item {
  itemID: string;
  price: number;
  traderID: string;
  orderType: OrderType;
  expirationDate: Date;

  constructor(
    itemID: string,
    price: number,
    traderID: string,
    orderType: OrderType,
    expirationDate: Date
  ) {
    this.itemID = itemID;
    this.price = price;
    this.traderID = traderID;
    this.orderType = orderType;
    this.expirationDate = expirationDate;
  }

  getItemID(): string {
    return this.itemID;
  }

  getOrderType(): OrderType {
    return this.orderType;
  }

  checkIfExpired(): boolean {
    return true;
  }
}
