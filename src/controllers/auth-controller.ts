import { Response, NextFunction } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { UserModel } from '../models/user-model';

class AuthController {
    static async login(req: ICustomReq, res: Response, next: NextFunction) {
        try {
            if (!req.body.email || !req.body.password) {
                throw { name: 'Email and Password Required' };
            }
            if (req.body.email) {
                if (!validator.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
            }
            const loginUser = {
                email: req.body.email,
                password: req.body.password
            };
            const foundOneUser = await UserModel.findOne({
                email: loginUser.email
            });
            if (!foundOneUser) {
                throw { name: `Combination doesn't Match` };
            }
            const isPasswordValid = await bcrypt.compare(
                loginUser.password,
                foundOneUser.password
            );
            if (!isPasswordValid) {
                throw { name: `Combination doesn't Match` };
            }
            const token = jwt.sign(
                {
                    id: foundOneUser._id,
                    name: foundOneUser.name,
                    role: foundOneUser.role
                },
                process.env.SECRET_KEY!
            );
            res.status(200).json({
                success: true,
                message: 'Login Success',
                data: {
                    Authorization: `Bearer ${token}`
                },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { AuthController };
