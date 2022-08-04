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
    limitOrder(item: Item): Receipt;
    marketOrder(item: Item): Receipt;
    calculateMarketPrices(): void;
    calculateBid(): number;
    calculateAsk(): number;
    checkExecute(item: Item): boolean;
    addBuyOrder(item: Item): boolean;
    addSellOrder(item: Item): boolean;
    removeBuyOrder(): Item;
    removeSellOrder(): Item;
    comparePrice(a: Item, b: Item): number;
}
