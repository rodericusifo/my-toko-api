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
            const url = req.protocol + '://' + req.get('host');
            const createProduct: { [key: string]: any } = {
                name: req.body.name,
                code: req.body.code,
                Brand: req.body.Brand
            };
            if (req.file) {
                createProduct.image = url + '/public/' + req.file.filename;
            }
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

    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundProducts = await ProductModel.find(
                {},
                'name code image Brand createdAt'
            ).populate('Brand', 'name');
            if (foundProducts.length < 1) {
                throw { name: 'Products not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'Products found',
                data: { Products: foundProducts },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }

    static async edit(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (req.body.code) {
                if (!validator.isNumeric(req.body.code.slice(3))) {
                    throw { name: 'Invalid Product Code' };
                }
            }
            const url = req.protocol + '://' + req.get('host');
            const editProduct: { [key: string]: any } = {
                name: req.body.name,
                code: req.body.code
            };
            if (req.file) {
                editProduct.image = url + '/public/' + req.file.filename;
            }
            for (const key in editProduct) {
                if (!editProduct[key]) {
                    delete editProduct[key];
                }
            }
            await ProductModel.findOneAndUpdate(
                { _id: req.params.productID },
                editProduct,
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: 'Edit Product Success',
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { ProductController };
