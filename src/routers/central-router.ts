import { Router } from 'express';
import { ErrorHandler } from '../middlewares/error-handler-middleware';
import { authRouter } from './auth-router';

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
        this.router.use('/auth', authRouter)
        this.router.use(ErrorHandler.handleErrors);
    }
}

const centralRouter = new RCentral(Router()).getRouter();

export { centralRouter };
