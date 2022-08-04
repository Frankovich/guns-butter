import { ReceiptType } from "./ReceiptTypeEnum";
export declare class Receipt {
    outcome: ReceiptType;
    buyer: string | null;
    seller: string | null;
    itemID: string;
    priceSold: number | null;
    constructor(outcome: ReceiptType, itemID: string, priceSold: number | null, buyer: string | null, seller: string | null);
}
