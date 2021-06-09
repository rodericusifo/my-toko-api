import { Schema, Model, model } from 'mongoose';
import { IDODoc } from '../interfaces/DO-doc-interface';

const DOSchema = new Schema(
    {
        DONumber: { type: String, trim: true, unique: true, required: true },
        DODate: { type: Date, required: true },
        quantity: { type: Number, min: 0, default: 0, required: true },
        POProduct: {
            type: Schema.Types.ObjectId,
            ref: 'POProduct',
            required: true
        }
    },
    { timestamps: true }
);

const DOModel: Model<IDODoc> = model<IDODoc>('DO', DOSchema);

export { DOModel };
