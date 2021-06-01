import { Schema, Model, model } from 'mongoose';
import { IProductDoc } from '../interfaces/product-doc-interface';

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        code: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        image: {
            type: String,
            trim: true,
            default:
                'https://www.pngitem.com/pimgs/m/27-272007_transparent-product-icon-png-product-vector-icon-png.png'
        },
        Brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true }
    },
    { timestamps: true }
);

const ProductModel: Model<IProductDoc> = model<IProductDoc>(
    'Product',
    ProductSchema
);

export { ProductModel };
