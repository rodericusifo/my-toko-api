import { Document } from 'mongoose';

interface IOrderProductDoc extends Document {
    quantity: number;
    amount: number;
    UOM: string;
}

export { IOrderProductDoc };
