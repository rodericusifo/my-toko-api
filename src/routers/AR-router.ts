import { Router } from 'express';
import { ARController } from '../controllers/AR-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class RAR {
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
        this.router.get(
            '/list',
            [JWTAuthorization.ownerFinanceAuthorization],
            ARController.list
        );
    }
}

const ARRouter = new RAR(Router()).getRouter();

export { ARRouter };
