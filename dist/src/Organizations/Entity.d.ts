export declare class Entity {
    constructor(name: string, revenues: number, costs: number);
    profit(): number;
    tax(taxRate?: number): number;
    profitAfterTax(): number;
    profitMargin(): number;
    taxRate(): number;
    profitMarginAfterTax(): number;
}
