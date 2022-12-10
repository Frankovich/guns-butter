"use strict";
// Make an exportable class containing revenues, costs and the methods required to track them
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
// Make ts class
class Entity {
    // Make the method to calculate the profit
    profit() {
        return this.revenues - this.costs;
    }
    // Make the method to calculate the tax
    tax(taxRate = 0.0) {
        return this.profit() * taxRate;
    }
    // Make the method to calculate the profit after tax
    profitAfterTax() {
        return this.profit() - this.tax();
    }
    // Make the method to calculate the profit margin
    profitMargin() {
        return this.profit() / this.revenues;
    }
    // Make the method to calculate the tax rate
    taxRate() {
        return this.tax() / this.revenues;
    }
    // Make the method to calculate the profit margin after tax
    profitMarginAfterTax() {
        return this.profitAfterTax() / this.revenues;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map