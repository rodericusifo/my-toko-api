import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { OrderModel } from '../models/order-model';

class OrderController {
    static async create(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (
                !req.body.orderNumber ||
                !req.body.orderDate ||
                !req.body.customerName ||
                !req.body.isTaxed
            ) {
                throw {
                    name: 'Order Number, Date, Customer Name and Is Taxed Required'
                };
            }
            let tax = 0;
            if (req.body.isTaxed === 'YES') {
                tax = 10;
            }
            const createOrder = {
                orderNumber: req.body.orderNumber,
                orderDate: req.body.orderDate,
                customerName: req.body.customerName,
                tax: tax
            };
            const newOrder = new OrderModel(createOrder);
            await newOrder.save();
            res.status(201).json({
                success: true,
                message: 'Create Order Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

export { OrderController };
