import { Econ } from "../src/Econ";

describe("Test Market Orders", () => {
    var econ: Econ;
    var date = new Date();
    describe("market buy", () => {
        it("It should trigger one market order", () => {
            econ = new Econ();
            var orderCount: number = 0;
            econ.add("0", 5, "a", "limit sell", date);
            econ.add("0", 5, "a", "market buy", date)
            expect(econ.exchanges[0].sellOrders.length).toBe(orderCount);
        });
    });

    describe("market buy", () => {
        it("It should trigger one market order", () => {
            econ = new Econ();
            var orderCount: number = 0;
            econ.add("0", 5, "a", "limit buy", date);
            econ.add("0", 5, "a", "market sell", date)
            expect(econ.exchanges[0].sellOrders.length).toBe(orderCount);
        });
    });

    describe("market buy", () => {
        it("It should trigger one market order and leave one sell order in econ", () => {
            econ = new Econ();
            var orderCount: number = 1;
            econ.add("0", 5, "a", "limit sell", date);
            econ.add("0", 5, "a", "limit sell", date);
            econ.add("0", 5, "a", "market buy", date)
            expect(econ.exchanges[0].sellOrders.length).toBe(orderCount);
        });
    });

    describe("market sell", () => {
        it("It should trigger one market order and leave one sell order in econ", () => {
            econ = new Econ();
            var orderCount: number = 1;
            econ.add("0", 5, "a", "limit buy", date);
            econ.add("0", 5, "a", "limit buy", date);
            econ.add("0", 5, "a", "market sell", date)
            expect(econ.exchanges[0].buyOrders.length).toBe(orderCount);
        });
    });

    describe("market buy fail", () => {
        it("It should fail one market order and leave no others", () => {
            econ = new Econ();
            var orderCount: number = 0;
            econ.add("0", 5, "a", "market buy", date)
            expect(econ.exchanges[0].buyOrders.length).toBe(orderCount);
        });
    });

    describe("market sell fail", () => {
        it("It should fail one market order and leave no others", () => {
            econ = new Econ();
            var orderCount: number = 0;
            econ.add("0", 5, "a", "market sell", date)
            expect(econ.exchanges[0].buyOrders.length).toBe(orderCount);
        });
    });

    describe("market sell fail despite sell orders", () => {
        it("It should fail one market order and leave two others", () => {
            econ = new Econ();
            var orderCount: number = 2;
            econ.add("0", 5, "a", "limit sell", date)
            econ.add("0", 5, "a", "limit sell", date)
            econ.add("0", 5, "a", "market sell", date)
            expect(econ.exchanges[0].sellOrders.length).toBe(orderCount);
        });
    });

    describe("market buy fail despite sell orders", () => {
        it("It should fail one market order and leave two others", () => {
            econ = new Econ();
            var orderCount: number = 2;
            econ.add("0", 5, "a", "limit buy", date)
            econ.add("0", 5, "a", "limit buy", date)
            econ.add("0", 5, "a", "market buy", date)
            expect(econ.exchanges[0].buyOrders.length).toBe(orderCount);
        });
    });
});