import { Response, NextFunction } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { UserModel } from '../models/user-model';
import nodemailer from 'nodemailer';

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

    static async passwordResetRequest(
        req: ICustomReq,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (!req.body.email) {
                throw { name: 'Email Required' };
            }
            if (req.body.email) {
                if (!validator.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
            }
            const passwordResetRequestUser = {
                email: req.body.email
            };
            const foundOneUser = await UserModel.findOne({
                email: passwordResetRequestUser.email
            });
            if (!foundOneUser) {
                throw { name: 'Email not Registered' };
            }
            const token = jwt.sign(
                {
                    id: foundOneUser._id,
                    secretResetPasswordCode:
                        process.env.SECRET_RESET_PASSWORD_CODE!
                },
                process.env.SECRET_KEY!,
                { expiresIn: '1h' }
            );
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.EMAIL!,
                    pass: process.env.EMAIL_PASS!
                }
            });

            const mailOptions = {
                from: process.env.EMAIL!,
                to: foundOneUser.email,
                subject: `My Toko's Account Reset Password Link`,
                html: `<p>To reset your account's password, please click the link below</p><a href="${process
                    .env
                    .CLIENT_URL!}auth/password/reset?token=${token}" target="_blank">${process
                    .env.CLIENT_URL!}auth/password/reset?token=${token}</a>`
            };
            await transporter.sendMail(mailOptions);
            res.status(200).json({
                success: true,
                message: 'Email Successfully Sent',
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { AuthController };
