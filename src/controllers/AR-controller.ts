import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { OrderModel } from '../models/order-model';

class ARController {
    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundListAR = await OrderModel.find(
                { status: 'PAID' },
                'orderNumber orderDate status total'
            );
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
