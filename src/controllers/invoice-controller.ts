import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { POModel } from '../models/PO-model';

class invoiceController {
    static async create(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (!req.body.POID || !req.body.INVNumber || !req.body.INVDate) {
                throw {
                    name: 'invoice Number, Date, and PO ID Required'
                };
            }
            await POModel.findByIdAndUpdate(
                { _id: req.body.POID },
                {
                    INVNumber: req.body.INVNumber,
                    INVDate: req.body.INVDate,
                    status: 'PENDING',
                    INVCreated: true
                },
                { new: true }
            );
            res.status(201).json({
                success: true,
                message: 'Create Invoice Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }

    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundListInvoice = await POModel.find(
                { INVCreated: true },
                'INVNumber INVDate PONumber status'
            );
            if (foundListInvoice.length < 1) {
                throw { name: 'List of Invoice not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'List of PO found',
                data: { Invoices: foundListInvoice },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { invoiceController };
