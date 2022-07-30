import { Item } from "./Item";
import { Receipt } from "./Receipt";
export declare class Exchange {
    itemID: string;
    buyOrders: Item[];
    sellOrders: Item[];
    ask: number;
    bid: number;
    constructor(itemID: string);
    add(item: Item): Receipt;
    calculateMarketPrices(): void;
    calculateBid(): number;
    calculateAsk(): number;
    checkExecute(item: Item): boolean;
    getItemID(): string;
    addBuyOrder(item: Item): boolean;
    addSellOrder(item: Item): boolean;
    removeBuyOrder(): Item;
    removeSellOrder(): Item;
    logBuyOrders(): void;
    logSellOrders(): void;
    getBid(): number;
    getAsk(): number;
    comparePrice(a: Item, b: Item): number;
}
