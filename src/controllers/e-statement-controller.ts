import { Response, NextFunction } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { OrderModel } from '../models/order-model';
import { POModel } from '../models/PO-model';

class EStatementController {
    static async detail(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const incomes = await OrderModel.find(
                { status: 'PAID' },
                'orderNumber orderDate total'
            );
            if (incomes.length < 1) {
                throw { name: 'List of Incomes not Found' };
            }
            const expenses = await POModel.find(
                {
                    INVCreated: true,
                    status: 'PAID'
                },
                'INVNumber INVDate total'
            );
            if (expenses.length < 1) {
                throw { name: 'List of Expenses not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'Incomes and Expenses found',
                data: { Incomes: incomes, Expenses: expenses },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

export { EStatementController };
