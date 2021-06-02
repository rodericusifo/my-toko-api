import { Schema, Model, model } from 'mongoose';
import { ISupplierDoc } from '../interfaces/supplier-doc-interface';

const SupplierSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        companyName: {
            type: String,
            trim: true,
            required: true
        },
        phoneNumber: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        discount: {
            type: Number,
            min: 0,
            required: true
        }
    },
    { timestamps: true }
);

const SupplierModel: Model<ISupplierDoc> = model<ISupplierDoc>(
    'Supplier',
    SupplierSchema
);

export { SupplierModel };
