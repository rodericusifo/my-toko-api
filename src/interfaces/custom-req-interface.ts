import { Request } from 'express';

interface ICustomReq extends Request {
    userTokenID?: string;
}

export { ICustomReq };
