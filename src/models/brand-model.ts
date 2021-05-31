import { Schema, Model, model } from 'mongoose';
import { IBrandDoc } from '../interfaces/brand-doc-interface';

const BrandSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true
        }
    },
    { timestamps: true }
);

const BrandModel: Model<IBrandDoc> = model<IBrandDoc>('Brand', BrandSchema);

export { BrandModel };
