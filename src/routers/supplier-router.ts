import { Router } from 'express';
import { SupplierController } from '../controllers/supplier-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class RSupplier {
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
            [JWTAuthorization.ownerInventoryAuthorization],
            SupplierController.create
        );
        this.router.get(
            '/list',
            [JWTAuthorization.ownerInventoryAuthorization],
            SupplierController.list
        );
    }
}

const supplierRouter = new RSupplier(Router()).getRouter();

export { supplierRouter };
