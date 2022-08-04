export enum ReceiptType {
    NoSellOrders= "Market Buy Order Refused",
    NoBuyOrders= "Market Sell Order Refused",
    BuyAddedToExchange= "Limit Buy Added to Exchange",
    SellAddedToExchange= "Limit Sell Added to Exchange",
    LimitBuyOrderExecuted= "Limit Buy Order Executed",
    LimitSellOrderExecuted= "Limit Sell Order Executed",
    MarketBuyExecuted= "Market Buy Order Executed",
    MarketSellExecuted= "Market Sell Order Executed",
    Invalid= "Invalid"
}