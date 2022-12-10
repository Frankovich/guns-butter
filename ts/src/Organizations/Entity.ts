// Make an exportable class containing revenues, costs and the methods required to track them

// Make ts class
export class Entity {
// Make the properties/fields
    public name: string
    public revenues: number
    public costs: number

    // Make the constructor
    constructor(
        public name: string,
        public revenues: number,
        public costs: number
    ) {
        this.name = name
        this.revenues = revenues
        this.costs = costs
    }
    
    // Make the method to calculate the profit
    profit() {
        return this.revenues - this.costs
    }

    // Make the method to calculate the tax
    tax(taxRate: number = 0.0) {
        return this.profit() * taxRate
    } 

    // Make the method to calculate the profit after tax
    profitAfterTax() {
        return this.profit() - this.tax()
    }

    // Make the method to calculate the profit margin
    profitMargin() {
        return this.profit() / this.revenues
    }

    // Make the method to calculate the tax rate
    taxRate() {
        return this.tax() / this.revenues
    }

    // Make the method to calculate the profit margin after tax
    profitMarginAfterTax() {
        return this.profitAfterTax() / this.revenues
    }
}   