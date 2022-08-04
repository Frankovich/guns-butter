import { ReceiptType } from "./ReceiptTypeEnum"

export class Receipt {
  outcome: ReceiptType;
  buyer: string | null;
  seller: string | null;
  itemID: string;
  priceSold: number | null;

  constructor(
    outcome: ReceiptType,
    itemID: string,
    priceSold: number | null,
    buyer: string | null,
    seller: string | null
  ) {
    this.outcome = outcome;
    this.buyer = buyer;
    this.seller = seller;
    this.itemID = itemID;
    this.priceSold = priceSold;
  }
}
