import { Document } from 'mongoose';

interface IPOProductDoc extends Document {
    quantity: number;
    amount: number;
    remaining: number;
    UOM: string;
    PO: string;
}

export { IPOProductDoc };
