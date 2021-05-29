import { Response, NextFunction, ErrorRequestHandler } from 'express';
import { ICustomReq } from '../interfaces/custom-req-interface';

class ErrorHandler {
    static handleErrors(
        err: ErrorRequestHandler,
        _req: ICustomReq,
        res: Response,
        _next: NextFunction
    ) {
        let statusCode;
        let message;
        let status;

        switch (err.name) {
            case 'New Password Required':
                statusCode = 422;
                message =
                    'New Password Required: Your new password required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'Email not Registered':
                statusCode = 404;
                message = 'Email not Registered: Your email not registered';
                status = 'Not Found';
                break;
            case 'Email Required':
                statusCode = 422;
                message =
                    'Email Required: Your email required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'Users not Found':
                statusCode = 404;
                message = 'Users not Found: Cannot find users';
                status = 'Not Found';
                break;
            case 'Forbidden Role Access':
                statusCode = 403;
                message =
                    'Forbidden Role Access: Sorry, access is restricted, your role not allowed do this action';
                status = 'Forbidden';
                break;
            case 'Name, Email, Password, and Role Required':
                statusCode = 422;
                message =
                    'Name, Email, Password, and Role Required: User name, email, password, and role required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case `Combination doesn't Match`:
                statusCode = 401;
                message = `Combination doesn't Match: Password combination with your email does not match`;
                status = 'Unauthorized';
                break;
            case 'Invalid Email':
                statusCode = 422;
                message = 'Invalid Email: Please fill a valid email address';
                status = 'Unprocessable Entity';
                break;
            case 'Email and Password Required':
                statusCode = 422;
                message =
                    'Email and Password Required: Your email and password required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'Forbidden Access':
                statusCode = 403;
                message =
                    'Forbidden Access: Sorry, access is restricted, make sure you use your own access token';
                status = 'Forbidden';
                break;
            case 'Access Token not Assosiated':
                statusCode = 401;
                message = `Access Token Not Assosiated: access token not assosiated with any account in this web, please do register again`;
                status = 'Unauthorized';
                break;
            case 'Missing Access Token':
                statusCode = 401;
                message = `Missing Access Token: Please input your access token, if you doesn't have access token yet, do login first`;
                status = 'Unauthorized';
                break;
            case 'JsonWebTokenError':
                statusCode = 401;
                message =
                    'JsonWebTokenError: Invalid access token, please check the validity of your access token';
                status = 'Unauthorized';
                break;
            case 'MongoError':
                statusCode = 422;
                message = `MongoError: Sorry this data has been used by another user, please enter another unique data`;
                status = 'Unprocessable Entity';
                break;
            case 'ValidationError':
                statusCode = 422;
                message =
                    'ValidationError: Make sure you have filled all the required fields with the valid data';
                status = 'Unprocessable Entity';
                break;
            default:
                statusCode = 500;
                message = `Internal Server Error: Sorry, our server is in trouble`;
                status = 'Internal Server Error';
                break;
        }

        res.status(statusCode).json({
            success: false,
            message: message,
            status: status,
            statusCode: statusCode
        });
    }
}

export { ErrorHandler };
