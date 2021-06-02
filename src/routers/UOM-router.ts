import { Router } from 'express';
import { UOMController } from '../controllers/UOM-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class RUOM {
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
            UOMController.create
        );
        this.router.get(
            '/list',
            [JWTAuthorization.ownerInventoryAuthorization],
            UOMController.list
        );
    }
}

const UOMRouter = new RUOM(Router()).getRouter();

export { UOMRouter };
