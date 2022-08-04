import { Econ } from "../src/Econ";

describe("Econ tests", () => {
  var cap: Econ;
  var date = new Date();
  describe("addExchange", () => {
    it("There should be one exchange", () => {
      cap = new Econ();
      var exchangeCount: number = 1;
      cap.add("0", 5, "a", "limit sell", date);
      console.log(cap);
      expect(cap.exchanges.length).toBe(exchangeCount);
    });
  });

  describe("addExchange", () => {
    it("There should be two exchange", () => {
      cap = new Econ();
      var exchangeCount: number = 2;
      cap.add("0", 5, "a", "limit sell", date);
      cap.add("1", 6, "a", "limit sell", date);
      cap.add("1", 7, "a", "limit sell", date);
      expect(cap.exchanges.length).toBe(exchangeCount);
    });
  });

  describe("addExchange", () => {
    it("There should be two exchange", () => {
      cap = new Econ();
      var exchangeCount: number = 5;
      cap.add("0", 5, "a", "limit sell", date);
      cap.add("1", 6, "a", "limit sell", date);
      cap.add("2", 7, "a", "limit sell", date);
      cap.add("3", 7, "a", "limit sell", date);
      cap.add("4", 7, "a", "limit sell", date);
      cap.add("1", 6, "a", "limit sell", date);
      expect(cap.exchanges.length).toBe(exchangeCount);
    });
  });

  describe("addSaleItems", () => {
    it("There should be one exchange and three items", () => {
      cap = new Econ();
      var exchangeCount: number = 1;
      var orderCount: number = 3;
      cap.add("0", 5, "a", "limit sell", date);
      cap.add("0", 5, "a", "limit sell", date);
      cap.add("0", 5, "a", "limit sell", date);
      expect(cap.exchanges.length).toBe(exchangeCount);
      expect(cap.exchanges[0].sellOrders.length).toBe(orderCount);
    });
  });

  describe("addSaleItems", () => {
    it("There should be two exchanges and two items each", () => {
      cap = new Econ();
      var exchangeCount: number = 2;
      var orderCount: number = 2;
      cap.add("0", 5, "a", "limit sell", date);
      cap.add("0", 5, "a", "limit sell", date);
      cap.add("1", 5, "a", "limit sell", date);
      cap.add("1", 5, "a", "limit sell", date);
      expect(cap.exchanges.length).toBe(exchangeCount);
      expect(cap.exchanges[0].sellOrders.length).toBe(orderCount);
      expect(cap.exchanges[1].sellOrders.length).toBe(orderCount);
    });
  });

  describe("addBuyItems", () => {
    it("There should be one exchange and three items", () => {
      cap = new Econ();
      var exchangeCount: number = 1;
      var orderCount: number = 3;
      cap.add("0", 5, "a", "limit buy", date);
      cap.add("0", 5, "a", "limit buy", date);
      cap.add("0", 5, "a", "limit buy", date);
      expect(cap.exchanges.length).toBe(exchangeCount);
      expect(cap.exchanges[0].buyOrders.length).toBe(orderCount);
    });
  });

  describe("addBuyItems", () => {
    it("There should be two exchanges and two items each", () => {
      cap = new Econ();
      var exchangeCount: number = 2;
      var orderCount: number = 2;
      cap.add("0", 5, "a", "limit buy", date);
      cap.add("0", 5, "a", "limit buy", date);
      cap.add("1", 5, "a", "limit buy", date);
      cap.add("1", 5, "a", "limit buy", date);
      expect(cap.exchanges.length).toBe(exchangeCount);
      expect(cap.exchanges[0].buyOrders.length).toBe(orderCount);
      expect(cap.exchanges[1].buyOrders.length).toBe(orderCount);
    });
  });

  describe("Check if same items execute", () => {
    it("There should be no items in one exchange", () => {
      cap = new Econ();
      var exchangeCount: number = 1;
      var orderCount: number = 0;
      cap.add("0", 5, "a", "limit buy", date);
      cap.add("0", 5, "a", "limit sell", date);
      
      expect(cap.exchanges.length).toBe(exchangeCount);
      expect(cap.exchanges[0].buyOrders.length).toBe(orderCount);
    });
  });

  describe("Check if same items execute", () => {
    it("There should be no items in one exchange", () => {
      cap = new Econ();
      var exchangeCount: number = 1;
      var orderCount: number = 0;
      cap.add("0", 5, "a", "limit buy", date);
      cap.add("0", 5, "a", "limit sell", date);
      
      expect(cap.exchanges.length).toBe(exchangeCount);
      expect(cap.exchanges[0].buyOrders.length).toBe(orderCount);
    });
  });

  describe("Check if items dont execute in different exchanges", () => {
    it("one item in each of two exchanges", () => {
      cap = new Econ();
      var exchangeCount: number = 2;
      var orderCount: number = 1;
      cap.add("0", 5, "a", "limit buy", date);
      cap.add("1", 5, "a", "limit sell", date);
      
      expect(cap.exchanges.length).toBe(exchangeCount);
      expect(cap.exchanges[0].buyOrders.length).toBe(orderCount);
      expect(cap.exchanges[1].sellOrders.length).toBe(orderCount);
    });
  });

  describe("Confirm bid and ask are isolated", () => {
    it("one exchange, 5 buys, 1 sell", () => {
      cap = new Econ();
      var exchangeCount: number = 1;
      var buyCount: number = 5;
      var sellCount: number = 1;
      cap.add("0", 5, "a", "limit buy", date);
      cap.add("0", 5.1, "a", "limit buy", date);
      cap.add("0", 5.2, "a", "limit buy", date);
      cap.add("0", 5.3, "a", "limit buy", date);
      cap.add("0", 5.4, "a", "limit buy", date);
      
      cap.add("0", 5.5, "a", "limit sell", date);
      
      expect(cap.exchanges.length).toBe(exchangeCount);
      expect(cap.exchanges[0].buyOrders.length).toBe(buyCount);
      expect(cap.exchanges[0].sellOrders.length).toBe(sellCount);
    });
  });

  describe("Confirm bid and ask are isolated", () => {
    it("one exchange, 4 buys, 0 sell", () => {
      cap = new Econ();
      var exchangeCount: number = 1;
      var buyCount: number = 4;
      var sellCount: number = 1;

      cap.add("0", 5, "a", "limit buy", date);
      cap.add("0", 5.1, "a", "limit buy", date);
      cap.add("0", 5.2, "a", "limit buy", date);
      cap.add("0", 5.3, "a", "limit buy", date);
      cap.add("0", 5.4, "a", "limit buy", date);
      
      cap.add("0", 5.3, "a", "limit sell", date);
      cap.add("0", 5.4, "a", "limit sell", date);

      expect(cap.exchanges.length).toBe(exchangeCount);
      expect(cap.exchanges[0].buyOrders.length).toBe(buyCount);
      expect(cap.exchanges[0].sellOrders.length).toBe(sellCount);
    });
  });
});
