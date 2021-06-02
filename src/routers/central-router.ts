import { Router } from 'express';
import { ErrorHandler } from '../middlewares/error-handler-middleware';
import { authRouter } from './auth-router';
import { brandRouter } from './brand-router';
import { productRouter } from './product-router';
import { supplierRouter } from './supplier-router';
import { UOMRouter } from './UOM-router';
import { userRouter } from './user-router';

class RCentral {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
        this.middlewares();
    }

    public getRouter(): Router {
        return this.router;
    }

    private middlewares(): void {
        this.router.use('/auth', authRouter);
        this.router.use('/users', userRouter);
        this.router.use('/brands', brandRouter);
        this.router.use('/products', productRouter);
        this.router.use('/UOM', UOMRouter);
        this.router.use('/suppliers', supplierRouter);
        this.router.use(ErrorHandler.handleErrors);
    }
}

const centralRouter = new RCentral(Router()).getRouter();

export { centralRouter };
