import { Router } from 'express';
import { DOController } from '../controllers/DO-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class RDO {
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
            DOController.create
        );
        this.router.get(
            '/list',
            [JWTAuthorization.ownerInventoryAuthorization],
            DOController.list
        );
    }
}

const DORouter = new RDO(Router()).getRouter();

export { DORouter };
