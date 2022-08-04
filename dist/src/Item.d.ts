import { OrderType } from "./OrderTypeEnum";
export declare class Item {
    itemID: string;
    price: number;
    traderID: string;
    orderType: OrderType;
    expirationDate: Date;
    constructor(itemID: string, price: number, traderID: string, orderType: OrderType, expirationDate: Date);
    getItemID(): string;
    getOrderType(): OrderType;
    checkIfExpired(): boolean;
}
