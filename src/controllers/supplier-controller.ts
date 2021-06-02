import { Response, NextFunction } from 'express';
import validator from 'validator';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { SupplierModel } from '../models/supplier-model';

class SupplierController {
    static async create(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (
                !req.body.name ||
                !req.body.companyName ||
                !req.body.phoneNumber ||
                !req.body.email ||
                !req.body.discount
            ) {
                throw {
                    name: 'Supplier Name, Company Name, Phone Number, Email, and Discount Required'
                };
            }
            if (req.body.email) {
                if (!validator.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
            }
            const createSupplier = {
                name: req.body.name,
                companyName: req.body.companyName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                discount: req.body.discount
            };
            const newSupplier = new SupplierModel(createSupplier);
            await newSupplier.save();
            res.status(201).json({
                success: true,
                message: 'Create Supplier Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }

    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundSuppliers = await SupplierModel.find({}, 'name companyName phoneNumber email discount createdAt');
            if (foundSuppliers.length < 1) {
                throw { name: 'Brands not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'Suppliers found',
                data: { Suppliers: foundSuppliers },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { SupplierController };
