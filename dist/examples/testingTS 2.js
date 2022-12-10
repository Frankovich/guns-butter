"use strict";
const gb = require("../src/index");
var econ = new gb.Econ();
var date = new Date();
econ.add("sugar", 5.2, "traderA", "buy", date);
econ.add("sugar", 5.4, "traderB", "buy", date);
econ.add("sugar", 5.6, "traderC", "sell", date);
econ.logReport();
econ.logBuyOrders();
econ.logSellOrders();
//# sourceMappingURL=testingTS.js.map