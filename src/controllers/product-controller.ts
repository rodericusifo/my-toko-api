import { Response, NextFunction } from 'express';
import validator from 'validator';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { ProductModel } from '../models/product-model';

class ProductController {
    static async create(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (!req.body.name || !req.body.code || !req.body.Brand) {
                throw { name: 'Product Name, Code, and Brand Required' };
            }
            if (req.body.code) {
                if (!validator.isNumeric(req.body.code.slice(3))) {
                    throw { name: 'Invalid Product Code' };
                }
            }
            const createProduct = {
                name: req.body.name,
                code: req.body.code,
                Brand: req.body.Brand
            };
            const newProduct = new ProductModel(createProduct);
            await newProduct.save();
            res.status(201).json({
                success: true,
                message: 'Create Product Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }
}

export { ProductController };
