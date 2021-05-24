import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class RUser {
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
            [JWTAuthorization.ownerAuthorization],
            UserController.create
        );
    }
}

const userRouter = new RUser(Router()).getRouter();

export { userRouter };
