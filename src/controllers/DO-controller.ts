import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { DOModel } from '../models/DO-model';
import { POModel } from '../models/PO-model';
import { POProductModel } from '../models/PO-product-model';
import { SupplierModel } from '../models/supplier-model';
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
}

export { DOController };
