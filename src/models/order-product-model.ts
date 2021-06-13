import { Schema, Model, model } from 'mongoose';
import { IOrderProductDoc } from '../interfaces/order-product-doc-interface';

const OrderProductSchema = new Schema(
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
        UOM: { type: Schema.Types.ObjectId, ref: 'UOM', required: true },
    },
    { timestamps: true }
);

const OrderProductModel: Model<IOrderProductDoc> = model<IOrderProductDoc>(
    'OrderProduct',
    OrderProductSchema
);

export { OrderProductModel };
