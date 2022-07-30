declare enum OrderType {
    Buy = 0,
    Sell = 1
}

declare class Item {
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

declare class Receipt {
    buyer: string | null;
    seller: string | null;
    itemID: string;
    priceSold: number | null;
    constructor(itemID: string, priceSold: number | null, buyer: string | null, seller: string | null);
}

declare class Exchange {
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

declare class GunsAndButter {
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

export { GunsAndButter };
