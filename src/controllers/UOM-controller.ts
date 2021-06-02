import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { UOMModel } from '../models/UOM-model';

class UOMController {
    static async create(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (
                !req.body.name ||
                !req.body.purchasePrice ||
                !req.body.sellingPrice ||
                !req.body.Product
            ) {
                throw {
                    name: 'UOM Name, Purchase Price, Selling Price, and Brand Required'
                };
            }
            const foundUOM = await UOMModel.findOne({
                name: req.body.name,
                Product: req.body.Product
            });
            if (foundUOM) {
                throw { name: 'MongoError' };
            }
            const createUOM = {
                name: req.body.name,
                purchasePrice: req.body.purchasePrice,
                sellingPrice: req.body.sellingPrice,
                Product: req.body.Product
            };
            const newUOM = new UOMModel(createUOM);
            await newUOM.save();
            res.status(201).json({
                success: true,
                message: 'Create UOM Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }
}

export { UOMController };
