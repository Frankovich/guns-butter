"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptType = void 0;
var ReceiptType;
(function (ReceiptType) {
    ReceiptType["NoSellOrders"] = "Market Buy Order Refused";
    ReceiptType["NoBuyOrders"] = "Market Sell Order Refused";
    ReceiptType["BuyAddedToExchange"] = "Limit Buy Added to Exchange";
    ReceiptType["SellAddedToExchange"] = "Limit Sell Added to Exchange";
    ReceiptType["LimitBuyOrderExecuted"] = "Limit Buy Order Executed";
    ReceiptType["LimitSellOrderExecuted"] = "Limit Sell Order Executed";
    ReceiptType["MarketBuyExecuted"] = "Market Buy Order Executed";
    ReceiptType["MarketSellExecuted"] = "Market Sell Order Executed";
    ReceiptType["Invalid"] = "Invalid";
})(ReceiptType = exports.ReceiptType || (exports.ReceiptType = {}));
//# sourceMappingURL=ReceiptTypeEnum.js.map