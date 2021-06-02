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
}

export { SupplierController };
