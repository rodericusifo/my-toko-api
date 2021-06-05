import { Schema, Model, model } from 'mongoose';
import { IPOProductDoc } from '../interfaces/PO-product-doc-interface';

const POProductSchema = new Schema(
    {
        quantity: {
            type: Number,
            min: 0,
            required: true
        },
        amount: {
            type: Number,
            min: 0,
            required: true
        },
        remaining: {
            type: Number,
            min: 0,
            required: true
        },
        UOM: { type: Schema.Types.ObjectId, ref: 'UOM', required: true },
        PO: { type: Schema.Types.ObjectId, ref: 'PO', required: true }
    },
    { timestamps: true }
);

const POProductModel: Model<IPOProductDoc> = model<IPOProductDoc>(
    'POProduct',
    POProductSchema
);

export { POProductModel };
