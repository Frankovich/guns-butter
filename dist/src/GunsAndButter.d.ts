import { Exchange } from "./Exchange";
import { Item } from "./Item";
import { OrderType } from "./OrderType";
import { Receipt } from "./Receipt";
export declare class GunsAndButter {
    exchanges: Exchange[];
    exchangeCount: number;
    itemCount: number;
    receipts: Receipt[];
    constructor();
    addExchange(exchange: Exchange): void;
    createItem(itemID: string, price: number, traderID: string, orderType: OrderType, expirationDate: Date): Item;
    addItem(itemID: string, price: number, traderID: string, orderType: OrderType, expirationDate: Date): Boolean;
    getReceipts(): Receipt[];
    calcBids(): void;
    calcAsks(): void;
    getBids(): number[];
    getAsks(): number[];
    logBuyOrders(): void;
    logSellOrders(): void;
    logReport(): void;
}
