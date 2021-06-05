import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { POModel } from '../models/PO-model';

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
}

export { POController };
