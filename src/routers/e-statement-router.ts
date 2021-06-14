import { Router } from 'express';
import { EStatementController } from '../controllers/e-statement-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class REStatement {
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
            '/detail',
            [JWTAuthorization.ownerAuthorization],
            EStatementController.detail
        );
    }
}

const EStatementRouter = new REStatement(Router()).getRouter();

export { EStatementRouter };
