import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';

class RAuth {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
        this.routers();
    }

    public getRouter(): Router {
        return this.router;
    }

    private routers(): void {
        this.router.post('/login', AuthController.login);
    }
}

const authRouter = new RAuth(Router()).getRouter();

export { authRouter };
