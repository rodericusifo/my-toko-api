import express, { Application, Response } from 'express';
import { DBConfig } from './configs/DB-config';
import { ICustomReq } from './interfaces/custom-req-interface';
import { centralRouter } from './routers/central-router';
import cors from 'cors';
import { UserModel } from './models/user-model';
import bcrypt from 'bcrypt';

class App {
    private framework: Application;

    constructor(appFramework: Application) {
        this.framework = appFramework;
        this.plugins();
        this.settings();
        this.router();
        this.middlewares();
    }

    public getFramework(): Application {
        return this.framework;
    }

    private async plugins() {
        DBConfig.connectDB();
        const registerOwner = {
            name: 'Rodericus Ifo Krista',
            email: 'rodericus1999@gmail.com',
            password: await bcrypt.hash('211299', 8),
            role: 'OWNER'
        };
        const newUser = new UserModel(registerOwner);
        await newUser.save();
    }

    private settings(): void {
        this.framework.set('views', __dirname + '/views');
        this.framework.set('view engine', 'ejs');
    }

    private router(): void {
        this.framework.get('/', (_req: ICustomReq, res: Response) => {
            res.status(200).render('index');
        });
    }

    private middlewares(): void {
        this.framework.use(cors());
        this.framework.use(express.json({ limit: '50mb' }));
        this.framework.use(
            express.urlencoded({ extended: true, limit: '50mb' })
        );
        this.framework.use('/public', express.static('public'));
        this.framework.use(centralRouter);
    }
}

const app = new App(express()).getFramework();

export { app };
