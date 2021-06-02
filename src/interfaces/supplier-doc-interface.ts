import { Document } from 'mongoose';

interface ISupplierDoc extends Document {
    name: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    discount: number;
}

export { ISupplierDoc };
