import { Response, NextFunction } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { UserModel } from '../models/user-model';

class UserController {
    static async create(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (
                !req.body.name ||
                !req.body.email ||
                !req.body.password ||
                !req.body.role
            ) {
                throw { name: 'Name, Email, Password, and Role Required' };
            }
            if (req.body.email) {
                if (!validator.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
            }
            const createUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            };
            if (req.body.password) {
                createUser.password = await bcrypt.hash(req.body.password, 8);
            }
            const newUser = new UserModel(createUser);
            await newUser.save();
            res.status(201).json({
                success: true,
                message: 'Create User Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }

    static async list(_req: ICustomReq, res: Response, next: NextFunction) {
        try {
            const foundInventoryUsers = await UserModel.find(
                { role: 'INVENTORY' },
                'name email role'
            );
            const foundFinanceUsers = await UserModel.find(
                { role: 'FINANCE' },
                'name email role'
            );
            const foundCashierUsers = await UserModel.find(
                { role: 'CASHIER' },
                'name email role'
            );
            const foundUsers = [
                ...foundInventoryUsers,
                ...foundFinanceUsers,
                ...foundCashierUsers
            ];
            if (foundUsers.length < 1) {
                throw { name: 'Users not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'Users found',
                data: { Users: foundUsers },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { UserController };
