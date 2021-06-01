import { Router } from 'express';
import { ProductController } from '../controllers/product-controller';
import { JWTAuthorization } from '../middlewares/JWT-authorization-middleware';

class RProduct {
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
            ProductController.create
        );
        this.router.get(
            '/list',
            [JWTAuthorization.ownerInventoryAuthorization],
            ProductController.list
        );
        this.router.put(
            '/:productID/edit',
            [JWTAuthorization.ownerInventoryAuthorization],
            ProductController.edit
        );
    }
}

const productRouter = new RProduct(Router()).getRouter();

export { productRouter };
