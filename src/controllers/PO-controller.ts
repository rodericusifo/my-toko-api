import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { POModel } from '../models/PO-model';
import { POProductModel } from '../models/PO-product-model';
import { SupplierModel } from '../models/supplier-model';
import { UOMModel } from '../models/UOM-model';

class POController {
    static async create(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (
                !req.body.PONumber ||
                !req.body.PODate ||
                !req.body.shipTo.name ||
                !req.body.shipTo.companyName ||
                !req.body.shipTo.phoneNumber ||
                !req.body.shipTo.email ||
                !req.body.Supplier
            ) {
                throw {
                    name: 'PO Number, Date, Ship To Name, Ship To Company Name, Ship To Phone Number, Ship To Email, and Supplier Required'
                };
            }
            const createPO = {
                PONumber: req.body.PONumber,
                PODate: req.body.PODate,
                shipTo: {
                    name: req.body.shipTo.name,
                    companyName: req.body.shipTo.companyName,
                    email: req.body.shipTo.email,
                    phoneNumber: req.body.shipTo.phoneNumber
                },
                Supplier: req.body.Supplier,
                INVNumber: `undefined${req.body.PONumber.slice(2)}`
            };
            const newPO = new POModel(createPO);
            await newPO.save();
            res.status(201).json({
                success: true,
                message: 'Create PO Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }

    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundListPO = await POModel.find(
                {},
                'PONumber PODate createdAt'
            );
            if (foundListPO.length < 1) {
                throw { name: 'List of PO not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'List of PO found',
                data: { POList: foundListPO },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }

    static async IDDetail(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundPO = await POModel.findOne(
                {
                    _id: req.params.POID
                },
                'PONumber PODate Supplier shipTo subTotal total POProducts'
            )
                .populate(
                    'Supplier',
                    'name companyName phoneNumber email discount'
                )
                .populate({
                    path: 'POProducts',
                    select: 'quantity amount remaining UOM',
                    populate: {
                        path: 'UOM',
                        select: 'name purchasePrice Product',
                        populate: { path: 'Product', select: 'name' }
                    }
                });
            res.status(200).json({
                success: true,
                message: 'PO found',
                data: { PO: foundPO },
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
                throw { name: 'Product UOM not Found for PO Product' };
            }
            const createPOProduct: { [key: string]: string | number } = {
                quantity: req.body.quantity,
                remaining: req.body.quantity,
                UOM: req.body.UOM,
                PO: req.params.POID
            };
            if (req.body.quantity && req.body.UOM) {
                createPOProduct.amount =
                    req.body.quantity * foundUOM.purchasePrice;
            }
            const newPOProduct = new POProductModel(createPOProduct);
            const savedPOProduct = await newPOProduct.save();
            await POModel.findOneAndUpdate(
                { _id: req.params.POID },
                {
                    $push: { POProducts: savedPOProduct._id },
                    $inc: { subTotal: savedPOProduct.amount }
                },
                { new: true }
            );
            const foundPO = await POModel.findOne({ _id: req.params.POID });
            const foundSupplier = await SupplierModel.findOne({
                _id: foundPO!.Supplier
            });
            await POModel.findOneAndUpdate(
                { _id: req.params.POID },
                {
                    total:
                        foundPO!.subTotal -
                        foundPO!.subTotal * (foundSupplier!.discount / 100)
                },
                { new: true }
            );
            res.status(201).json({
                success: true,
                message: 'Add Product PO Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }
}

export { POController };
