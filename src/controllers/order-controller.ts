import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { OrderModel } from '../models/order-model';
import { OrderProductModel } from '../models/order-product-model';
import { UOMModel } from '../models/UOM-model';

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

    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundListOrder = await OrderModel.find(
                {},
                'orderNumber orderDate status customerName'
            );
            if (foundListOrder.length < 1) {
                throw { name: 'List of Order not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'List of Order found',
                data: { Orders: foundListOrder },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }

    static async IDDetail(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundOrder = await OrderModel.findOne(
                {
                    _id: req.params.orderID
                },
                'orderNumber orderDate customerName status canceledReason OrderProducts subTotal total tax'
            ).populate({
                path: 'OrderProducts',
                select: 'quantity amount UOM',
                populate: {
                    path: 'UOM',
                    select: 'name sellingPrice Product',
                    populate: { path: 'Product', select: 'name' }
                }
            });
            if (!foundOrder) {
                throw { name: 'Order not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'Order found',
                data: { Order: foundOrder },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }

    static async IDAddProduct(
        req: ICustomReq,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (!req.body.quantity || !req.body.UOM) {
                throw {
                    name: 'Product Quantity and UOM Required'
                };
            }
            const foundUOM = await UOMModel.findOne({
                _id: req.body.UOM
            });
            if (!foundUOM) {
                throw { name: 'Product UOM not Found for Order Product' };
            }
            const createOrderProduct: { [key: string]: string | number } = {
                quantity: req.body.quantity,
                UOM: req.body.UOM
            };
            if (req.body.quantity && req.body.UOM) {
                createOrderProduct.amount =
                    req.body.quantity * foundUOM.sellingPrice;
            }
            const newOrderProduct = new OrderProductModel(createOrderProduct);
            const savedOrderProduct = await newOrderProduct.save();
            await OrderModel.findOneAndUpdate(
                { _id: req.params.orderID },
                {
                    $push: { OrderProducts: savedOrderProduct._id },
                    $inc: { subTotal: savedOrderProduct.amount }
                },
                { new: true }
            );
            const foundOrder = await OrderModel.findOne({
                _id: req.params.orderID
            });
            await OrderModel.findOneAndUpdate(
                { _id: req.params.orderID },
                {
                    total:
                        foundOrder!.subTotal +
                        foundOrder!.subTotal * (foundOrder!.tax / 100)
                },
                { new: true }
            );
            res.status(201).json({
                success: true,
                message: 'Add Product Order Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }

    static async IDEditStatus(
        req: ICustomReq,
        res: Response,
        next: NextFunction
    ) {
        try {
            const editStatusOrder = {
                status: req.query.status as string,
                canceledReason: req.body.canceledReason
            };
            for (const key in editStatusOrder) {
                if (!editStatusOrder[key]) {
                    delete editStatusOrder[key];
                }
            }
            await OrderModel.findOneAndUpdate(
                { _id: req.params.orderID },
                editStatusOrder,
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: 'Edit status Invoice success',
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { OrderController };
