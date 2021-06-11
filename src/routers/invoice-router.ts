import { Router } from 'express';
import { invoiceController } from '../controllers/invoice-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class Rinvoice {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
        this.routers();
    }

    public getRouter(): Router {
        return this.router;
    }

    private routers(): void {
        this.router.use(JWTAuthorization.verifyAccessToken);
        this.router.post(
            '/create',
            [JWTAuthorization.ownerFinanceAuthorization],
            invoiceController.create
        );
    }
}

const invoiceRouter = new Rinvoice(Router()).getRouter();

export { invoiceRouter };
