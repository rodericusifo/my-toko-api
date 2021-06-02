import { Schema, Model, model } from 'mongoose';
import { IUOMDoc } from '../interfaces/UOM-doc-interface';

const UOMSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        purchasePrice: {
            type: Number,
            min: 0,
            required: true
        },
        sellingPrice: {
            type: Number,
            min: 0,
            required: true
        },
        stock: {
            type: Number,
            min: 0,
            default: 0
        },
        status: {
            type: String,
            trim: true,
            default: 'ACTIVE'
        },
        Product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
    },
    { timestamps: true }
);

const UOMModel: Model<IUOMDoc> = model<IUOMDoc>('UOM', UOMSchema);

export { UOMModel };
