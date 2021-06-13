import { Document } from 'mongoose';

interface IOrderDoc extends Document {
    orderNumber: string;
    orderDate: string;
    customerName: string;
    status: string;
    OrderProducts: string[];
    subTotal: number;
    total: number;
    tax: number;
    canceledReason: string;
}

export { IOrderDoc };
