import { Application } from 'express';
import { app } from './app';

class Server {
    private app: Application;
    private port: number;

    constructor(app: Application, port: number) {
        this.app = app;
        this.port = port;
        this.listener();
    }

    private listener() {
        this.app.listen(this.port, () => {
            console.log(`listening on http://localhost:${this.port}`);
        });
    }
}

new Server(app, Number(process.env.PORT!));
