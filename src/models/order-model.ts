import { Schema, Model, model } from 'mongoose';
import { IOrderDoc } from '../interfaces/order-doc-interface';

const OrderSchema = new Schema(
    {
        orderNumber: { type: String, trim: true, unique: true, required: true },
        orderDate: { type: Date, required: true },
        customerName: { type: String, trim: true, required: true },
        status: { type: String, trim: true, default: 'PENDING' },
        OrderProducts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'OrderProduct'
            }
        ],
        subTotal: { type: Number, min: 0, default: 0 },
        total: { type: Number, min: 0, default: 0 },
        tax: { type: Number, min: 0, required: true },
        canceledReason: { type: String, trim: true, default: undefined }
    },
    { timestamps: true }
);

const OrderModel: Model<IOrderDoc> = model<IOrderDoc>('Order', OrderSchema);

export { OrderModel };
