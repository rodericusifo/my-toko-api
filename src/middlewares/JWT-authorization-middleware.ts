import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IDecodedToken } from '../interfaces/decoded-token-interface';
import { ICustomReq } from '../interfaces/custom-req-interface';
import { UserModel } from '../models/user-model';

class JWTAuthorization {
    static async verifyAccessToken(
        req: ICustomReq,
        _res: Response,
        next: NextFunction
    ) {
        try {
            if (!req.header('Authorization')) {
                throw { name: 'Missing Access Token' };
            }
            const decoded = jwt.verify(
                req.header('Authorization')!.replace('Bearer ', ''),
                process.env.SECRET_KEY!
            ) as IDecodedToken;
            req.userTokenID = decoded.id;
            next();
        } catch (err) {
            next(err);
        }
    }

    static async ownerAuthorization(
        req: ICustomReq,
        _res: Response,
        next: NextFunction
    ) {
        try {
            const foundUser = await UserModel.findOne({ _id: req.userTokenID });
            if (!foundUser) {
                throw { name: 'Access Token not Assosiated' };
            }
            if (!(String(foundUser._id) === req.query.userID)) {
                throw { name: 'Forbidden Access' };
            }
            if (!(foundUser.role === 'OWNER')) {
                throw { name: 'Forbidden Role Access' };
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}

export { JWTAuthorization };
