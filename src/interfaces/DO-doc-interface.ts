import { Document } from 'mongoose';

interface IDODoc extends Document {
    DONumber: string;
    DODate: string;
    quantity: number;
    POProduct: string;
}

export { IDODoc };
