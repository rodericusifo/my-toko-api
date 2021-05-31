import { Router } from 'express';
import { BrandController } from '../controllers/brand-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class RBrand {
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
            BrandController.create
        );
    }
}

const brandRouter = new RBrand(Router()).getRouter();

export { brandRouter };
