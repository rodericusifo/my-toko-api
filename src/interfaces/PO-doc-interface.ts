import { Document } from 'mongoose';

interface IPODoc extends Document {
    PONumber: string;
    PODate: string;
    shipTo: {
        name: string;
        companyName: string;
        phoneNumber: string;
        email: string;
    };
    INVNumber: string;
    INVDate: string;
    billTo: {
        name: string;
        companyName: string;
        phoneNumber: string;
        email: string;
    };
    status: string;
    POProducts: string[];
    subTotal: number;
    total: number;
    Supplier: string;
    INVCreated: boolean;
}

export { IPODoc };
