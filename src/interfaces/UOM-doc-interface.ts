import { Document } from 'mongoose';

interface IUOMDoc extends Document {
    name: string;
    purchasePrice: number;
    sellingPrice: number;
    stock: number;
    status: string;
    Product: string;
}

export { IUOMDoc };
