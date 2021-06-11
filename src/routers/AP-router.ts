import { Router } from 'express';
import { APController } from '../controllers/AP-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class RAP {
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
            APController.list
        );
    }
}

const APRouter = new RAP(Router()).getRouter();

export { APRouter };
