import { Schema, Model, model } from 'mongoose';
import { IPODoc } from '../interfaces/PO-doc-interface';

const POSchema = new Schema(
    {
        PONumber: { type: String, trim: true, unique: true, required: true },
        PODate: { type: Date, required: true },
        shipTo: {
            name: { type: String, trim: true, required: true },
            companyName: { type: String, trim: true, required: true },
            phoneNumber: { type: String, trim: true, required: true },
            email: { type: String, trim: true, required: true }
        },
        INVNumber: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        INVDate: { type: Date, default: undefined },
        billTo: {
            name: { type: String, trim: true, default: undefined },
            companyName: { type: String, trim: true, default: undefined },
            phoneNumber: { type: String, trim: true, default: undefined },
            email: { type: String, trim: true, default: undefined }
        },
        status: { type: String, trim: true, default: undefined },
        POProducts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'POProduct'
            }
        ],
        subTotal: { type: Number, min: 0, default: 0 },
        total: { type: Number, min: 0, default: 0 },
        Supplier: {
            type: Schema.Types.ObjectId,
            ref: 'Supplier',
            required: true
        },
        INVCreated: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const POModel: Model<IPODoc> = model<IPODoc>('PO', POSchema);

export { POModel };
