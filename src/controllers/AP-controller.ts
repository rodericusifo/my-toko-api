import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { POModel } from '../models/PO-model';

class APController {
    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundListAP = await POModel.find(
                { INVCreated: true, status: 'PAID' },
                'INVNumber INVDate status Supplier total'
            ).populate('Supplier', 'name companyName');
            if (foundListAP.length < 1) {
                throw { name: 'List of AP not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'List of AP found',
                data: { APList: foundListAP },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { APController };
