import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { BrandModel } from '../models/brand-model';

class BrandController {
    static async create(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (!req.body.name) {
                throw { name: 'Brand Name Required' };
            }
            const createBrand = {
                name: req.body.name
            };
            const newBrand = new BrandModel(createBrand);
            await newBrand.save();
            res.status(201).json({
                success: true,
                message: 'Create Brand Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }

    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundBrands = await BrandModel.find({}, 'name');
            if (foundBrands.length < 1) {
                throw { name: 'Brands not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'Brands found',
                data: { Brands: foundBrands },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { BrandController };
