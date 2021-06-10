import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { DOModel } from '../models/DO-model';
import { POProductModel } from '../models/PO-product-model';
import { UOMModel } from '../models/UOM-model';

class DOController {
    static async create(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (
                !req.body.DONumber ||
                !req.body.DODate ||
                !req.body.POProduct ||
                !req.body.quantity
            ) {
                throw {
                    name: 'DO Number, Date, POProduct, and Quantity Required'
                };
            }
            const foundPOProduct = await POProductModel.findOne({
                _id: req.body.POProduct
            });
            if (foundPOProduct!.remaining - req.body.quantity < 0) {
                throw {
                    name: 'DO Quantity Exceeds the Amount Ordered'
                };
            }
            const createDO = {
                DONumber: req.body.DONumber,
                DODate: req.body.DODate,
                POProduct: req.body.POProduct,
                quantity: req.body.quantity
            };
            const newDO = new DOModel(createDO);
            const savedDO = await newDO.save();
            const updatedPOProduct = await POProductModel.findOneAndUpdate(
                { _id: req.body.POProduct },
                { $inc: { remaining: -savedDO.quantity } },
                { new: true }
            );
            await UOMModel.findOneAndUpdate(
                { _id: updatedPOProduct!.UOM },
                { $inc: { stock: savedDO.quantity } },
                { new: true }
            );
            res.status(201).json({
                success: true,
                message: 'Create DO Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }

    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundListDO = await DOModel.find(
                {},
                'DONumber DODate POProduct quantity createdAt'
            ).populate({
                path: 'POProduct',
                select: 'UOM PO',
                populate: [
                    {
                        path: 'UOM',
                        select: 'name',
                        populate: { path: 'Product', select: 'name' }
                    },
                    { path: 'PO', select: 'PONumber' }
                ]
            });
            if (foundListDO.length < 1) {
                throw { name: 'List of DO not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'List of DO found',
                data: { DOList: foundListDO },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { DOController };
