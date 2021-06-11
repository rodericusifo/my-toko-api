import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { POModel } from '../models/PO-model';

class ARController {
    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundListAR = await POModel.find(
                { INVCreated: true, status: 'PAID' },
                'INVNumber INVDate status Supplier total'
            ).populate('Supplier', 'name companyName');
            if (foundListAR.length < 1) {
                throw { name: 'List of AR not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'List of AR found',
                data: { ARList: foundListAR },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { ARController };
