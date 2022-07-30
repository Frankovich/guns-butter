//import { GunsAndButter } from './GunsAndButter';
import { OrderType } from "./OrderType";
const GunsAndButter = require("./GunsAndButter");

var date = new Date();

var sim = new GunsAndButter();

sim.addItem("0", 5, "a", OrderType.Sell, date);
sim.addItem("0", 5, "b", OrderType.Buy, date);

console.log("ask: ", sim.exchanges[0].sellOrders);
console.log("bid: ", sim.exchanges[0].buyOrders);

console.log(sim.getReceipts());
