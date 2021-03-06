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
            case 'List of Incomes not Found':
                statusCode = 404;
                message = 'List of Incomes not Found: Cannot find list of Incomes';
                status = 'Not Found';
                break;
            case 'List of Expenses not Found':
                statusCode = 404;
                message = 'List of Expenses not Found: Cannot find list of Expenses';
                status = 'Not Found';
                break;
            case 'List of AP not Found':
                statusCode = 404;
                message = 'List of AP not Found: Cannot find list of AP';
                status = 'Not Found';
                break;
            case 'Ordered Quantity Exceeds the Product Stock':
                statusCode = 422;
                message =
                    'Ordered Quantity Exceeds the Product Stock: Ordered Quantity Exceeds the Product Stock';
                status = 'Unprocessable Entity';
                break;
            case 'Order not Found':
                statusCode = 404;
                message = 'Order not Found: Cannot find order';
                status = 'Not Found';
                break;
            case 'Product UOM not Found for Order Product':
                statusCode = 404;
                message =
                    'Product UOM not Found for Order Product: Cannot find Product UOM for Order Product';
                status = 'Not Found';
                break;
            case 'List of Order not Found':
                statusCode = 404;
                message = 'List of Order not Found: Cannot find list of order';
                status = 'Not Found';
                break;
            case 'Order Number, Date, Customer Name and Is Taxed Required':
                statusCode = 422;
                message =
                    'Order Number, Date, Customer Name and Is Taxed Required: Order Number, Date, Customer Name and Is Taxed Required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'List of UOM Active not Found':
                statusCode = 404;
                message =
                    'List of UOM Active not Found: Cannot find list of UOM Active';
                status = 'Not Found';
                break;
            case 'List of AR not Found':
                statusCode = 404;
                message = 'List of AR not Found: Cannot find list of AR';
                status = 'Not Found';
                break;
            case 'invoice Number, Date, and PO ID Required':
                statusCode = 422;
                message =
                    'invoice Number, Date, and PO ID Required: invoice Number, Date, and PO ID required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'List of DO not Found':
                statusCode = 404;
                message = 'List of DO not Found: Cannot find list of DO';
                status = 'Not Found';
                break;
            case 'DO Quantity Exceeds the Amount Ordered':
                statusCode = 422;
                message =
                    'DO Quantity Exceeds the Amount Ordered: DO quantity exceeds the amount ordered';
                status = 'Unprocessable Entity';
                break;
            case 'DO Number, Date, POProduct, and Quantity Required':
                statusCode = 422;
                message =
                    'DO Number, Date, POProduct, and Quantity Required: DO Number, Date, POProduct, and Quantity required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'List of All PO Product not Found':
                statusCode = 404;
                message =
                    'List of All PO Product not Found: Cannot find List of All PO Product';
                status = 'Not Found';
                break;
            case 'PO not Found':
                statusCode = 404;
                message = 'PO not Found: Cannot find the PO';
                status = 'Not Found';
                break;
            case 'Product UOM not Found for PO Product':
                statusCode = 404;
                message =
                    'Product UOM not Found for PO Product: Cannot find Product UOM for PO Product';
                status = 'Not Found';
                break;
            case 'Product Quantity and UOM Required':
                statusCode = 422;
                message =
                    'Product Quantity and UOM Required: Product Quantity and UOM required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'List of PO not Found':
                statusCode = 404;
                message = 'List of PO not Found: Cannot find list of PO';
                status = 'Not Found';
                break;
            case 'PO Number, Date, Ship To Name, Ship To Company Name, Ship To Phone Number, Ship To Email, and Supplier Required':
                statusCode = 422;
                message =
                    'PO Number, Date, Ship To Name, Ship To Company Name, Ship To Phone Number, Ship To Email, and Supplier Required: PO Number, Date, Ship To Name, Ship To Company Name, Ship To Phone Number, Ship To Email, and Supplier required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'Supplier Name, Company Name, Phone Number, Email, and Discount Required':
                statusCode = 422;
                message =
                    'Supplier Name, Company Name, Phone Number, Email, and Discount Required: Supplier Name, Company Name, Phone Number, Email, and Discount required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'List of UOM not Found':
                statusCode = 404;
                message = 'List of UOM not Found: Cannot find list of UOM';
                status = 'Not Found';
                break;
            case 'UOM Name, Purchase Price, Selling Price, and Brand Required':
                statusCode = 422;
                message =
                    'UOM Name, Purchase Price, Selling Price, and Brand Required: UOM Name, Purchase Price, Selling Price, and Brand required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'Products not Found':
                statusCode = 404;
                message = 'Products not Found: Cannot find products';
                status = 'Not Found';
                break;
            case 'Invalid Product Code':
                statusCode = 422;
                message =
                    'Invalid Product Code: Product code only contains numbers';
                status = 'Unprocessable Entity';
                break;
            case 'Brands not Found':
                statusCode = 404;
                message = 'Brands not Found: Cannot find brands';
                status = 'Not Found';
                break;
            case 'Brand Name Required':
                statusCode = 422;
                message =
                    'Brand Name Required: Brand name required to perform this action';
                status = 'Unprocessable Entity';
                break;
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
                message = `MongoError: Sorry this data has been used, please enter another unique data`;
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
