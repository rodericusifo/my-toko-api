import { Router } from 'express';
import { OrderController } from '../controllers/order-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class ROrder {
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
            [JWTAuthorization.ownerCashierAuthorization],
            OrderController.create
        );
    }
}

const orderRouter = new ROrder(Router()).getRouter();

export { orderRouter };