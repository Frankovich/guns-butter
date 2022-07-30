export declare class Receipt {
    buyer: string | null;
    seller: string | null;
    itemID: string;
    priceSold: number | null;
    constructor(itemID: string, priceSold: number | null, buyer: string | null, seller: string | null);
}
