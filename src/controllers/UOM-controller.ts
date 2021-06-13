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

    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundListUOM = await UOMModel.find(
                {},
                'name purchasePrice sellingPrice stock status Product createdAt'
            ).populate({
                path: 'Product',
                select: 'name code image Brand',
                populate: {
                    path: 'Brand',
                    select: 'name'
                }
            });
            if (foundListUOM.length < 1) {
                throw { name: 'List of UOM not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'List of UOM found',
                data: { UOMList: foundListUOM },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }

    static async listActive(
        _req: ICustomReq,
        res: Response,
        next: NextFunction
    ) {
        try {
            const foundListActiveUOM = await UOMModel.find(
                { status: 'ACTIVE' },
                'name sellingPrice stock Product'
            ).populate({
                path: 'Product',
                select: 'name image'
            });
            if (foundListActiveUOM.length < 1) {
                throw { name: 'List of UOM Active not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'List of UOM Active found',
                data: { UOMActiveList: foundListActiveUOM },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }

    static async editStatus(
        req: ICustomReq,
        res: Response,
        next: NextFunction
    ) {
        try {
            const editStatusUOM = {
                status: req.query.status as string
            };
            for (const key in editStatusUOM) {
                if (!editStatusUOM[key]) {
                    delete editStatusUOM[key];
                }
            }
            await UOMModel.findOneAndUpdate(
                { _id: req.params.UOMID },
                editStatusUOM,
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: 'Edit status UOM success',
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { UOMController };
