import { Router } from 'express';
import { POController } from '../controllers/PO-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class RPO {
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
            POController.create
        );
        this.router.get(
            '/list',
            [JWTAuthorization.ownerInventoryFinanceAuthorization],
            POController.list
        );
        this.router.get(
            '/:POID/detail',
            [JWTAuthorization.ownerInventoryAuthorization],
            POController.IDDetail
        );
        this.router.post(
            '/:POID/add-product',
            [JWTAuthorization.ownerInventoryAuthorization],
            POController.IDAddProduct
        );
        this.router.get(
            '/list-product',
            [JWTAuthorization.ownerInventoryAuthorization],
            POController.listProduct
        );
    }
}

const PORouter = new RPO(Router()).getRouter();

export { PORouter };
